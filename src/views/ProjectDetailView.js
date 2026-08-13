// Project Detail — meetings of one project, search/filter, delete.

import { icon, toast, modal, emptyState } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { queue } from '../lib/syncQueue.js';
import { topBarHTML, backButton, bottomNavHTML } from '../components/shared.js';
import { meetingGridCard } from '../components/items.js';
import { escapeHtml, debounce } from '../lib/utils.js';

export default {
  id: 'projectDetail',
  title: 'Project',

  render(ctx) {
    const p = store.project(ctx.params.id);
    if (!p) {
      return `
        ${topBarHTML({ title: 'Project', left: backButton() })}
        <main class="max-w-[1200px] mx-auto px-4">${emptyState({ icon: 'search_off', title: 'Project not found', message: 'This project may have been deleted.', action: '<a href="#/projects" class="btn btn-primary">All projects</a>' })}</main>`;
    }
    const tone = p.color === 'secondary' ? 'bg-secondary-fixed text-on-secondary-fixed'
      : p.color === 'tertiary' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary-fixed text-on-primary-fixed';
    return `
      ${topBarHTML({
        title: p.name || 'Project',
        left: backButton(),
        right: `<button class="icon-btn" data-more aria-label="More actions">${icon('more_vert')}</button>`,
      })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="card p-5 mb-5">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl ${tone} flex items-center justify-center shrink-0">${icon(p.icon || 'folder', 'text-[24px]')}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="chip text-[10px]">${escapeHtml(p.category || 'General')}</span>
              </div>
              <p class="text-[14px] text-on-surface-variant mt-2 leading-relaxed">${escapeHtml(p.description || 'No description.')}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-3 mb-5">
          <div class="relative flex-1">
            ${icon('search', 'absolute left-4 top-1/2 -translate-y-1/2 text-outline')}
            <input data-search class="input pl-12" placeholder="Search meetings…" aria-label="Search meetings" />
          </div>
          <div class="flex gap-2 overflow-x-auto hide-scrollbar">
            <select data-time class="input appearance-none py-2.5 text-[13px] cursor-pointer">
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select data-prio class="input appearance-none py-2.5 text-[13px] cursor-pointer">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <a href="#/meetings/new" class="btn btn-tonal shrink-0">${icon('add', 'text-[18px]')} New meeting</a>
        </div>

        <div data-grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </main>
      ${bottomNavHTML('projects')}`;
  },

  mount(ctx) {
    const root = ctx.root;
    const p = store.project(ctx.params.id);
    if (!p) return;
    const grid = root.querySelector('[data-grid]');
    const search = root.querySelector('[data-search]');
    const timeSel = root.querySelector('[data-time]');
    const prioSel = root.querySelector('[data-prio]');

    function inRange(m, range) {
      if (range === 'all' || !m.date) return true;
      const d = new Date(m.date + 'T00:00:00');
      const now = new Date();
      if (range === 'week') {
        const start = new Date(now); start.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
        const end = new Date(start); end.setDate(start.getDate() + 6);
        return d >= start && d <= end;
      }
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }

    function render() {
      const q = search.value.trim().toLowerCase();
      const list = store.meetingsForProject(p.id)
        .filter((m) => !q || (m.title + ' ' + (m.summary || '')).toLowerCase().includes(q))
        .filter((m) => inRange(m, timeSel.value))
        .filter((m) => prioSel.value === 'all' || m.priority === prioSel.value);

      if (!list.length) {
        grid.innerHTML = emptyState({ icon: 'event_note', title: 'No meetings found', message: 'Try adjusting your filters or write a new summary.', action: '<a href="#/meetings/new" class="btn btn-primary">New summary</a>' });
        return;
      }
      grid.innerHTML = list.map(meetingGridCard).join('');
    }

    search.addEventListener('input', debounce(render, 150));
    timeSel.addEventListener('change', render);
    prioSel.addEventListener('change', render);
    root.querySelector('[data-more]').addEventListener('click', async () => {
      const pin = await modal.confirm({
        title: 'Delete project',
        message: `Delete "${p.name}" and all its meetings? This cannot be undone. Enter your security PIN.`,
        confirmText: 'Delete', danger: true, pin: true,
      });
      if (!pin) return;
      store.removeProject(p.id);
      queue.enqueueProjectDelete(p.id, pin);
      toast.show('Project deleted.', 'success');
      ctx.navigate('/projects');
    });

    render();
    const unsub = store.subscribe(() => render());
    return () => { unsub(); };
  },
};
