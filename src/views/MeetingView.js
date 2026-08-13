// Meeting View — read-only display of a saved meeting (evidence log).

import { icon, priorityBadge, avatarStack, emptyState } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { topBarHTML, backButton, bottomNavHTML } from '../components/shared.js';
import { escapeHtml, sanitizeHTML, fmtDate, fmtTime, PRIORITY } from '../lib/utils.js';
import { driveFull } from '../lib/config.js';
import { attachmentSrc } from '../components/items.js';
import { refresh } from '../router.js';

export default {
  id: 'meetingView',
  title: 'Meeting',

  render(ctx) {
    const m = store.meeting(ctx.params.id);
    if (!m) {
      return `
        ${topBarHTML({ title: 'Meeting', left: backButton() })}
        <main class="max-w-[1200px] mx-auto px-4">${emptyState({ icon: 'search_off', title: 'Meeting not found', message: 'This meeting may have been deleted.', action: '<a href="#/" class="btn btn-primary">Back home</a>' })}</main>`;
    }

    const project = m.projectId ? store.project(m.projectId) : null;
    const prio = PRIORITY[m.priority] || PRIORITY.medium;
    const summary = sanitizeHTML(m.summary);
    const attachments = m.attachments || [];

    const attachmentCards = attachments.map((a) => {
      const src = attachmentSrc(a, 480);
      const href = a.fileId ? driveFull(a.fileId) : (src || '#');
      const fb = a.fileId ? driveFull(a.fileId) : '';
      const body = src
        ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(a.name || 'attachment')}" class="w-full h-full object-cover" loading="lazy" decoding="async" ${fb ? `onerror="this.onerror=null;this.src='${escapeHtml(fb)}'"` : ''} />`
        : `<div class="w-full h-full flex flex-col items-center justify-center gap-1 bg-surface-container-highest">${icon('broken_image', 'text-[26px] text-on-surface-variant')}<span class="px-1 text-center text-[9px] text-outline leading-tight">image lost<br>re-add</span></div>`;
      return `
        <a href="${escapeHtml(href)}" target="_blank" rel="noopener" class="relative w-28 h-28 rounded-xl border border-outline-variant overflow-hidden shrink-0 group" title="${escapeHtml(a.name || '')}">
          ${body}
          <span class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">${icon('open_in_new', 'text-[20px] text-white')}</span>
        </a>`;
    }).join('');

    return `
      ${topBarHTML({
        title: m.title || 'Meeting',
        left: backButton(),
        right: `<a href="#/meetings/${encodeURIComponent(m.id)}/edit" class="btn btn-primary h-10 px-4">${icon('edit', 'text-[18px]')}<span class="hidden sm:inline">Edit</span></a>`,
      })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">

          <!-- Meta -->
          <div class="md:col-span-4 flex flex-col gap-4">
            <div class="card p-4 flex flex-col gap-3">
              <div class="flex items-center justify-between gap-2">
                ${priorityBadge(m.priority)}
                <span class="text-[13px] text-on-surface-variant shrink-0">${escapeHtml(fmtTime(m.time))}</span>
              </div>
              <h1 class="text-xl font-bold text-on-surface leading-snug">${escapeHtml(m.title || 'Untitled meeting')}</h1>
              <div class="flex flex-col gap-2 text-[13px] text-on-surface-variant">
                <div class="flex items-center gap-2">
                  ${icon('calendar_today', 'text-[16px] text-outline')}<span>${escapeHtml(fmtDate(m.date))}</span>
                </div>
                ${project ? `<a href="#/projects/${encodeURIComponent(project.id)}" class="flex items-center gap-2 text-primary font-medium hover:underline w-fit">${icon('folder', 'text-[16px]')}${escapeHtml(project.name)}</a>` : ''}
              </div>
            </div>

            <div class="card p-4">
              <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-2 block">Participants</label>
              ${(m.participants || []).length
                ? `<div class="flex items-center gap-3 flex-wrap">
                    ${avatarStack(m.participants, 9, 6)}
                    <div class="flex flex-wrap gap-1.5">
                      ${m.participants.map((p) => `<span class="chip bg-secondary-container text-on-secondary-container">${escapeHtml(p.name)}</span>`).join('')}
                    </div>
                  </div>`
                : `<span class="text-[12px] text-outline">No participants added</span>`}
            </div>
          </div>

          <!-- Content -->
          <div class="md:col-span-8 flex flex-col gap-4">
            <div class="card p-4">
              <div class="flex items-center gap-1.5 border-b border-surface-variant pb-2.5 mb-3">
                ${icon('description', 'text-[16px] text-on-surface-variant')}
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Meeting Notes</label>
              </div>
              <div class="markdown-body text-[15px] leading-relaxed text-on-surface min-h-[80px]">${summary || '<span class="text-outline text-sm">No notes recorded.</span>'}</div>
            </div>

            <div class="card p-4">
              <div class="flex items-center gap-1.5 mb-3">
                ${icon('attach_file', 'text-[16px] text-on-surface-variant')}
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Attachments <span class="text-outline normal-case font-normal">(${attachments.length})</span></label>
              </div>
              ${attachments.length
                ? `<div class="flex gap-3 overflow-x-auto hide-scrollbar py-1">${attachmentCards}</div>`
                : `<span class="text-[12px] text-outline">No attachments.</span>`}
            </div>
          </div>
        </div>
      </main>
      ${bottomNavHTML()}`;
  },

  mount(ctx) {
    const root = ctx.root;
    if (!store.meeting(ctx.params.id)) {
      const unsub = store.subscribe(() => {
        if (store.meeting(ctx.params.id)) { unsub(); refresh(); }
      });
      return () => unsub();
    }
    return () => {};
  },
};
