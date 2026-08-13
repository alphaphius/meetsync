// Projects — grid of all projects.

import { icon, emptyState, modal, toast } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { queue } from '../lib/syncQueue.js';
import { topBarHTML, bottomNavHTML, fabHTML } from '../components/shared.js';
import { escapeHtml, debounce, uid, nowIso } from '../lib/utils.js';

const FILTERS = ['all', 'active', 'completed'];

export default {
  id: 'projects',
  title: 'Projects',

  render() {
    return `
      ${topBarHTML({
        title: 'Projects',
        left: '',
        right: `<button class="btn btn-tonal h-10 px-4" data-new>${icon('add', 'text-[18px]')}<span class="hidden sm:inline">New Project</span></button>`,
      })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="relative mb-4">
          ${icon('search', 'absolute left-4 top-1/2 -translate-y-1/2 text-outline')}
          <input data-search class="input pl-12" placeholder="Search projects…" aria-label="Search projects" />
        </div>
        <div class="flex gap-2 mb-5 overflow-x-auto hide-scrollbar">
          ${FILTERS.map((f) => `<button data-filter="${f}" class="chip ${f === 'all' ? 'chip-active' : ''}">${f[0].toUpperCase() + f.slice(1)}</button>`).join('')}
        </div>
        <div data-grid class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </main>
      ${fabHTML('#/meetings/new')}
      ${bottomNavHTML('projects')}`;
  },

  mount(ctx) {
    const root = ctx.root;
    const grid = root.querySelector('[data-grid]');
    const search = root.querySelector('[data-search]');
    let filter = 'all';

    function render() {
      const q = search.value.trim().toLowerCase();
      const list = store.get().projects
        .filter((p) => filter === 'all' || (filter === 'active' ? (p.status === 'active' || !p.status) : p.status === 'completed'))
        .filter((p) => !q || (p.name + ' ' + p.description + ' ' + p.category).toLowerCase().includes(q));

      if (!list.length) {
        grid.innerHTML = emptyState({ icon: 'folder_open', title: 'No projects found', message: 'Projects appear here once you create them.', action: '<button class="btn btn-primary" data-new>New Project</button>' });
        return;
      }
      grid.innerHTML = list.map((p) => {
        const tone = p.color === 'secondary' ? 'bg-secondary-fixed text-on-secondary-fixed'
          : p.color === 'tertiary' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary-fixed text-on-primary-fixed';
        const bar = p.color === 'secondary' ? 'bg-secondary' : p.color === 'tertiary' ? 'bg-tertiary' : 'bg-primary';
        const prog = Math.max(0, Math.min(100, Number(p.progress) || 0));
        return `
          <a href="#/projects/${encodeURIComponent(p.id)}" class="card p-5 flex flex-col hover:shadow-cardlg transition-all group">
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl ${tone} flex items-center justify-center">${icon(p.icon || 'folder', 'text-[22px]')}</div>
              <button data-del="${escapeHtml(p.id)}" class="icon-btn w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Delete project">${icon('delete', 'text-[18px]')}</button>
            </div>
            <h3 class="text-base font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">${escapeHtml(p.name || 'Untitled')}</h3>
            <p class="text-[13px] text-on-surface-variant line-clamp-2 mb-4 flex-1">${escapeHtml(p.description || 'No description.')}</p>
            <div class="flex items-center gap-2 mb-2">
              <div class="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden"><div class="${bar} h-full rounded-full" style="width:${prog}%"></div></div>
              <span class="text-[11px] font-semibold text-on-surface-variant">${prog}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="chip text-[10px]">${escapeHtml(p.category || 'General')}</span>
              <span class="text-[12px] text-outline">${p.meetingsCount || 0} meetings</span>
            </div>
          </a>`;
      }).join('');
    }

    search.addEventListener('input', debounce(render, 150));
    root.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('chip-active'));
        btn.classList.add('chip-active');
        filter = btn.dataset.filter;
        render();
      });
    });
    root.querySelector('[data-new]')?.addEventListener('click', () => {
      const name = prompt('New project name:');
      if (name && name.trim()) {
        const p = { id: uid('prj'), name: name.trim(), category: 'General', progress: 0, status: 'active', createdAt: nowIso() };
        store.upsertProject(p);
        queue.enqueueProjectSave(p);
        toast.show('Project created.', 'success');
        render();
      }
    });

    root.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.del;
        const pin = await modal.confirm({
          title: 'Delete project',
          message: 'This deletes the project and all its meetings. Enter your security PIN.',
          confirmText: 'Delete', danger: true, pin: true,
        });
        if (!pin) return;
        store.removeProject(id);
        queue.enqueueProjectDelete(id, pin);
        toast.show('Project deleted.', 'success');
        render();
      });
    });

    render();
    const unsub = store.subscribe(() => render());
    return () => { unsub(); };
  },
};
