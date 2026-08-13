// Reusable project/meeting card renderers.

import { icon, priorityBadge, avatarStack } from '../lib/ui.js';
import { escapeHtml, sanitizeHTML, fmtDateTime, PRIORITY } from '../lib/utils.js';
import { store } from '../lib/store.js';
import { driveThumb, driveFull } from '../lib/config.js';

// Best image source for an attachment (fileId → Drive thumb, else local blob).
export function attachmentSrc(a, w = 240) {
  if (!a) return '';
  if (a.fileId) return driveThumb(a.fileId, w);
  if (a.data && String(a.data).startsWith('data:')) return a.data;
  if (a.url) return a.url;
  return '';
}

export function attachmentThumbs(m, count = 4, size = 'w-16 h-16') {
  const atts = (m.attachments || []).slice(0, count).filter((a) => attachmentSrc(a));
  return atts.map((a) => {
    const src = attachmentSrc(a, 240);
    const fb = a.fileId ? driveFull(a.fileId) : '';
    return `<span class="${size} rounded-lg overflow-hidden border border-outline-variant/40 shrink-0 bg-surface-container-high inline-block">
      <img src="${escapeHtml(src)}" alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" ${fb ? `onerror="this.onerror=null;this.src='${escapeHtml(fb)}'"` : ''} /></span>`;
  }).join('');
}

export function projectCard(p) {
  const tone = p.color === 'secondary' ? 'bg-secondary-fixed text-on-secondary-fixed'
    : p.color === 'tertiary' ? 'bg-tertiary-fixed text-on-tertiary-fixed'
    : 'bg-primary-fixed text-on-primary-fixed';
  return `
    <a href="#/projects/${encodeURIComponent(p.id)}" class="min-w-[270px] max-w-[300px] bg-surface-container-lowest rounded-2xl p-4 shadow-card border border-outline-variant/30 flex-shrink-0 hover:shadow-cardlg transition-all group">
      <div class="flex justify-between items-start mb-3">
        <div class="w-10 h-10 rounded-xl ${tone} flex items-center justify-center">
          ${icon(p.icon || 'folder', 'text-[20px]')}
        </div>
        <span class="chip text-[10px]">${escapeHtml(p.category || 'General')}</span>
      </div>
      <h3 class="text-base font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">${escapeHtml(p.name || 'Untitled')}</h3>
      <p class="text-[13px] text-on-surface-variant line-clamp-2 mb-3 min-h-[36px]">${escapeHtml(p.description || 'No description yet.')}</p>
      <div class="flex items-center justify-between mt-2">
        <span class="text-[11px] text-outline">${p.meetingsCount || 0} meetings</span>
        <span class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">${icon('arrow_forward', 'text-[16px]')}</span>
      </div>
    </a>`;
}

export function meetingCard(m, opts = {}) {
  const bar = PRIORITY[m.priority]?.bar || PRIORITY.medium.bar;
  const projectName = opts.projectName ?? (m.projectId ? store.project(m.projectId)?.name : null);
  const time = fmtDateTime(m.date, m.time);
  const summary = sanitizeHTML(m.summary || '');
  const thumbs = attachmentThumbs(m, 4);
  const attCount = (m.attachments || []).length;
  return `
    <a href="#/meetings/${encodeURIComponent(m.id)}" class="card relative overflow-hidden flex p-4 pl-5 hover:shadow-cardlg transition-all" data-meeting="${escapeHtml(m.id)}">
      <div class="absolute left-0 top-0 bottom-0 w-1.5 ${bar}"></div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start gap-2 mb-1.5">
          ${priorityBadge(m.priority)}
          <span class="text-[13px] text-on-surface-variant shrink-0">${escapeHtml(time)}</span>
        </div>
        <h3 class="text-[15px] font-semibold text-on-surface mb-0.5 leading-snug">${escapeHtml(m.title || 'Untitled meeting')}</h3>
        ${projectName ? `<p class="text-[12px] text-primary font-medium mb-1.5">${escapeHtml(projectName)}</p>` : ''}
        ${summary ? `<div class="markdown-body text-[13px] leading-relaxed text-on-surface-variant mt-1 mb-2.5">${summary}</div>` : ''}
        ${thumbs ? `<div class="flex gap-2 mb-2.5">${thumbs}</div>` : ''}
        <div class="flex items-center gap-2">
          ${avatarStack(m.participants, 8, 3)}
          ${attCount ? `<span class="text-on-surface-variant flex items-center gap-0.5 text-[12px] ml-1">${icon('image', 'text-[16px]')}${attCount}</span>` : ''}
        </div>
      </div>
    </a>`;
}

export function meetingGridCard(m) {
  const badge = PRIORITY[m.priority]?.badge || PRIORITY.medium.badge;
  const summary = sanitizeHTML(m.summary || '');
  const thumbs = attachmentThumbs(m, 3);
  return `
    <a href="#/meetings/${encodeURIComponent(m.id)}" class="card p-4 flex flex-col gap-3 hover:shadow-cardlg transition-all group relative overflow-hidden">
      <div class="absolute left-0 top-0 bottom-0 w-1 ${PRIORITY[m.priority]?.bar || 'bg-secondary'}"></div>
      <div class="flex justify-between items-start pl-2">
        <span class="badge ${badge}">${escapeHtml(PRIORITY[m.priority]?.label || 'Medium')} Priority</span>
        ${(m.attachments || []).length ? `<span class="text-outline-variant">${icon('attachment', 'text-[18px]')}</span>` : ''}
      </div>
      <div class="pl-2">
        <h3 class="text-[15px] font-semibold text-on-surface leading-snug mb-1">${escapeHtml(m.title || 'Untitled meeting')}</h3>
        <div class="flex items-center gap-1 text-[13px] text-on-surface-variant">
          ${icon('event', 'text-[15px]')}<span>${escapeHtml(fmtDateTime(m.date, m.time))}</span>
        </div>
      </div>
      ${summary ? `<div class="markdown-body text-[13px] leading-relaxed text-on-surface-variant pl-2">${summary}</div>` : ''}
      ${thumbs ? `<div class="flex gap-2 pl-2">${thumbs}</div>` : ''}
      <div class="pt-3 border-t border-surface-variant flex items-center justify-between pl-2">
        ${avatarStack(m.participants, 8, 3)}
        <span class="text-primary text-[13px] font-medium">View Details ${icon('chevron_right', 'text-[16px]')}</span>
      </div>
    </a>`;
}
