// Home Dashboard — projects, recent meetings, search, FAB.

import { icon, toast, emptyState, skeletonCard } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { topBarHTML, avatarButton, bottomNavHTML, fabHTML } from '../components/shared.js';
import { projectCard, meetingCard } from '../components/items.js';
import { escapeHtml, debounce } from '../lib/utils.js';
import { navigateTo } from '../router.js';

export default {
  id: 'dashboard',
  title: 'Home',

  render() {
    const s = store.get();
    const user = s.settings.userName || 'Guest';
    const avatar = s.settings.userAvatar;
    return `
      ${topBarHTML({
        title: 'MeetSync',
        left: avatarButton(avatar, user),
        right: `<button class="icon-btn relative" data-notif aria-label="Notifications">${icon('notifications')}
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error hidden" data-notif-dot></span></button>`,
      })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12">
        <div class="mt-4 md:mt-6 relative">
          ${icon('search', 'absolute left-4 top-1/2 -translate-y-1/2 text-outline')}
          <input data-search class="input pl-12 py-3 text-[15px]" placeholder="Search meetings, projects…" aria-label="Search" />
        </div>

        <section class="mt-6" data-projects>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-on-surface">Active Projects</h2>
            <a href="#/projects" class="text-sm font-medium text-primary">View all</a>
          </div>
          <div data-projects-body></div>
        </section>

        <section class="mt-8" data-meetings>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-on-surface">Recent Meetings</h2>
            <a href="#/planner" class="text-sm font-medium text-primary">View all</a>
          </div>
          <div data-meetings-body class="flex flex-col gap-3"></div>
        </section>
      </main>
      ${fabHTML('#/meetings/new')}
      ${bottomNavHTML('home')}`;
  },

  mount(ctx) {
    const root = ctx.root;

    function renderProjects(query = '') {
      const body = root.querySelector('[data-projects-body]');
      const s = store.get();
      const q = query.trim().toLowerCase();
      const projects = s.projects
        .filter((p) => p.status === 'active' || !p.status)
        .filter((p) => !q || (p.name + ' ' + p.description + ' ' + p.category).toLowerCase().includes(q))
        .slice(0, 8);

      if (s.status === 'loading' && !s.projects.length) {
        body.innerHTML = `<div class="flex gap-4 overflow-x-auto hide-scrollbar">${skeletonCard(180) + skeletonCard(180) + skeletonCard(180)}</div>`;
        return;
      }
      if (!projects.length) {
        body.innerHTML = emptyState({ icon: 'folder_open', title: 'No projects yet', message: 'Create your first project to organize meetings.', action: '<a href="#/meetings/new" class="btn btn-primary">New summary</a>' });
        return;
      }
      body.innerHTML = `<div class="flex gap-4 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">${projects.map(projectCard).join('')}</div>`;
    }

    function renderMeetings(query = '') {
      const body = root.querySelector('[data-meetings-body]');
      const s = store.get();
      const q = query.trim().toLowerCase();
      const meetings = s.meetings
        .filter((m) => !q || (m.title + ' ' + (m.summary || '')).toLowerCase().includes(q))
        .slice(0, 8);

      if (s.status === 'loading' && !s.meetings.length) {
        body.innerHTML = skeletonCard(100) + skeletonCard(100) + skeletonCard(100);
        return;
      }
      if (!meetings.length) {
        body.innerHTML = emptyState({ icon: 'event_note', title: 'No meetings yet', message: 'Tap + to write your first meeting summary. It will be saved to Google Sheets in the background.', action: '<button class="btn btn-primary" data-new>New summary</button>' });
        return;
      }
      body.innerHTML = meetings.map((m) => meetingCard(m, { projectName: true })).join('');
    }

    function applySearch(q) { renderProjects(q); renderMeetings(q); }

    const search = root.querySelector('[data-search]');
    const onSearch = debounce((e) => applySearch(e.target.value), 180);
    search.addEventListener('input', onSearch);

    root.querySelector('[data-new]')?.addEventListener('click', () => navigateTo('/meetings/new'));

    const notif = root.querySelector('[data-notif]');
    notif.addEventListener('click', () => toast.show('No new notifications.', 'info'));

    // Avatar → settings
    root.querySelector('[data-avatar]')?.addEventListener('click', () => navigateTo('/settings'));

    renderProjects();
    renderMeetings();

    const unsub = store.subscribe(() => { if (search.value.trim()) return; renderProjects(); renderMeetings(); });
    return () => { unsub(); };
  },
};
