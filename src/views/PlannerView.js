// Planner — month calendar with per-day meeting dots + events list.

import { icon, toast, emptyState } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { topBarHTML, bottomNavHTML } from '../components/shared.js';
import { avatarStack } from '../lib/ui.js';
import { escapeHtml, todayStr, PRIORITY, fmtTime } from '../lib/utils.js';
import { navigateTo } from '../router.js';

const MONTHS_TH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function dateKey(year, month, day) { return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }

function meetingsByDate() {
  const map = {};
  store.get().meetings.forEach((m) => {
    if (!m.date) return;
    (map[m.date] = map[m.date] || []).push(m);
  });
  return map;
}

export default {
  id: 'planner',
  title: 'Calendar',

  render() {
    const today = todayStr();
    const d = new Date();
    this._state = { year: d.getFullYear(), month: d.getMonth(), selected: today };
    return `
      ${topBarHTML({
        title: 'Calendar',
        left: '',
        right: `<button class="icon-btn" data-search aria-label="Search">${icon('search')}</button>
                <button class="icon-btn" data-notif aria-label="Notifications">${icon('notifications')}</button>`,
      })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section class="lg:col-span-7 xl:col-span-8">
          <div class="card p-4">
            <div class="flex items-center justify-between mb-3">
              <h2 data-month class="text-lg font-semibold text-on-surface"></h2>
              <div class="flex items-center gap-1">
                <button class="btn btn-ghost h-9 px-3 text-[13px]" data-today>Today</button>
                <button class="icon-btn w-9 h-9" data-prev aria-label="Previous month">${icon('chevron_left')}</button>
                <button class="icon-btn w-9 h-9" data-next aria-label="Next month">${icon('chevron_right')}</button>
              </div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold text-on-surface-variant mb-1">
              ${WEEKDAYS.map((w, i) => `<div class="py-1.5 ${i > 4 ? 'text-outline' : ''}">${w}</div>`).join('')}
            </div>
            <div data-calendar class="grid grid-cols-7 gap-1"></div>
          </div>
        </section>
        <section class="lg:col-span-5 xl:col-span-4">
          <div class="flex items-center justify-between mb-3">
            <h3 data-events-title class="text-base font-semibold text-on-surface">Events</h3>
            <a href="#/meetings/new" class="btn btn-tonal h-9 px-3 text-[13px]">${icon('add', 'text-[16px]')} New meeting</a>
          </div>
          <div data-events class="flex flex-col gap-2.5"></div>
        </section>
      </main>
      ${bottomNavHTML('planner')}`;
  },

  mount(ctx) {
    const root = ctx.root;
    const s = this._state;
    const calendar = root.querySelector('[data-calendar]');
    const eventsEl = root.querySelector('[data-events]');
    const monthEl = root.querySelector('[data-month]');
    const titleEl = root.querySelector('[data-events-title]');

    function build() {
      const byDate = meetingsByDate();
      const first = new Date(s.year, s.month, 1);
      const startDow = (first.getDay() + 6) % 7;
      const daysInMonth = new Date(s.year, s.month + 1, 0).getDate();
      const prevDays = new Date(s.year, s.month, 0).getDate();
      const today = todayStr();

      let cells = '';
      for (let i = startDow - 1; i >= 0; i--) {
        const key = dateKey(s.month === 0 ? s.year - 1 : s.year, s.month === 0 ? 11 : s.month - 1, prevDays - i);
        cells += `<div class="p-2 rounded-lg text-[13px] text-outline-variant cursor-default text-center">${prevDays - i}</div>`;
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const key = dateKey(s.year, s.month, day);
        const list = byDate[key] || [];
        const isSel = key === s.selected;
        const isToday = key === today;
        const dots = list.slice(0, 3).map((m) => PRIORITY[m.priority]?.dot || PRIORITY.medium.dot).join('');
        cells += `
          <div data-day="${key}" role="button" tabindex="0" class="p-1.5 md:p-2 rounded-lg text-[13px] cursor-pointer transition-all text-center relative flex flex-col items-center justify-center min-h-[44px] hover:bg-surface-container
            ${isSel ? 'bg-primary text-on-primary font-bold shadow-sm' : isToday ? 'ring-1 ring-primary text-primary font-semibold' : 'text-on-surface'}">
            <span>${day}</span>
            ${list.length ? `<div class="flex gap-0.5 mt-0.5">
              ${dots ? `<span class="w-1.5 h-1.5 rounded-full ${PRIORITY[list[0].priority]?.dot}"></span>` : ''}
              ${list.length > 1 ? `<span class="w-1.5 h-1.5 rounded-full ${PRIORITY[list[1].priority]?.dot}"></span>` : ''}
              ${list.length > 2 ? `<span class="w-1.5 h-1.5 rounded-full ${PRIORITY[list[2].priority]?.dot}"></span>` : ''}
            </div>` : ''}
          </div>`;
      }
      const totalCells = (startDow + daysInMonth);
      const fill = 7 - (totalCells % 7 || 7);
      for (let i = 1; i <= fill; i++) {
        const key = dateKey(s.month === 11 ? s.year + 1 : s.year, s.month === 11 ? 0 : s.month + 1, i);
        cells += `<div class="p-2 rounded-lg text-[13px] text-outline-variant cursor-default text-center">${i}</div>`;
      }
      calendar.innerHTML = cells;
      monthEl.textContent = `${MONTHS_TH[s.month]} ${s.year}`;
      renderEvents(byDate);
    }

    function renderEvents(byDate) {
      const list = (byDate[s.selected] || []).sort((a, b) => String(a.time).localeCompare(String(b.time)));
      titleEl.textContent = `Events · ${s.selected.slice(8, 10)} ${MONTHS_TH[s.month]}`;
      if (!list.length) {
        eventsEl.innerHTML = emptyState({ icon: 'event_available', title: 'No meetings', message: 'Nothing scheduled for this day yet.', action: '<a href="#/meetings/new" class="btn btn-primary">Plan a meeting</a>' });
        return;
      }
      eventsEl.innerHTML = list.map((m) => `
        <a href="#/meetings/${encodeURIComponent(m.id)}" class="card p-4 flex overflow-hidden group hover:shadow-cardlg transition-all cursor-pointer">
          <div class="w-1.5 ${PRIORITY[m.priority]?.bar || 'bg-secondary'} rounded-l-xl shrink-0"></div>
          <div class="flex-1 min-w-0 pl-3">
            <div class="flex justify-between items-start gap-2">
              <span class="badge ${PRIORITY[m.priority]?.badge}">${escapeHtml(PRIORITY[m.priority]?.label || 'Medium')}</span>
              <span class="text-[12px] text-on-surface-variant shrink-0">${escapeHtml(fmtTime(m.time) || '')}</span>
            </div>
            <h4 class="text-[14px] font-semibold text-on-surface mt-1.5 leading-snug">${escapeHtml(m.title || 'Untitled meeting')}</h4>
            <div class="flex items-center justify-between mt-2">
              ${avatarStack(m.participants, 6, 3)}
              <span class="text-primary text-[13px] font-medium group-hover:underline">View ${icon('chevron_right', 'text-[15px]')}</span>
            </div>
          </div>
        </a>`).join('');
    }

    calendar.addEventListener('click', (e) => {
      const cell = e.target.closest('[data-day]');
      if (cell && cell.dataset.day) {
        s.selected = cell.dataset.day;
        build();
      }
    });
    calendar.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const cell = e.target.closest('[data-day]');
      if (cell) { e.preventDefault(); s.selected = cell.dataset.day; build(); }
    });

    root.querySelector('[data-prev]').addEventListener('click', () => { s.month--; if (s.month < 0) { s.month = 11; s.year--; } s.selected = dateKey(s.year, s.month, 1); build(); });
    root.querySelector('[data-next]').addEventListener('click', () => { s.month++; if (s.month > 11) { s.month = 0; s.year++; } s.selected = dateKey(s.year, s.month, 1); build(); });
    root.querySelector('[data-today]').addEventListener('click', () => {
      const d = new Date();
      s.year = d.getFullYear(); s.month = d.getMonth(); s.selected = todayStr();
      build();
    });
    root.querySelector('[data-search]').addEventListener('click', () => navigateTo('/'));
    root.querySelector('[data-notif]').addEventListener('click', () => toast.show('No new notifications.', 'info'));

    build();

    const unsub = store.subscribe(() => build());
    return () => { unsub(); };
  },
};
