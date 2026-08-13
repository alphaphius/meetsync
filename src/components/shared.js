// Reusable layout pieces + global sync indicator.

import { icon } from '../lib/ui.js';
import { escapeHtml } from '../lib/utils.js';
import { queue } from '../lib/syncQueue.js';
import { store } from '../lib/store.js';

/* ---------------- Top App Bar ---------------- */
export function topBarHTML({ title, left, right }) {
  return `
    <header class="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-outline-variant/40 px-4"
      style="padding-top:env(safe-area-inset-top,0px)">
      <div class="max-w-[1200px] mx-auto flex items-center justify-between h-14">
        <div class="flex items-center gap-2 min-w-0">
          ${left || ''}
          <h1 class="text-lg font-bold text-on-surface tracking-tight truncate">${escapeHtml(title)}</h1>
        </div>
        <div class="flex items-center gap-1 shrink-0">${right || ''}</div>
      </div>
    </header>`;
}

export function backButton(label = 'Back') {
  return `<button class="icon-btn -ml-2" data-back aria-label="${escapeHtml(label)}">${icon('arrow_back')}</button>`;
}

export function avatarButton(avatar, name) {
  if (avatar) {
    return `<button class="w-9 h-9 rounded-full overflow-hidden border border-outline-variant shrink-0" data-avatar aria-label="Profile">
      <img src="${escapeHtml(avatar)}" alt="${escapeHtml(name || 'Profile')}" class="w-full h-full object-cover" loading="lazy" decoding="async" /></button>`;
  }
  return `<button class="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-bold shrink-0" data-avatar aria-label="Profile">${escapeHtml((name || 'M')[0].toUpperCase())}</button>`;
}

/* ---------------- Bottom Navigation ---------------- */
const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home', href: '#/' },
  { key: 'planner', label: 'Planner', icon: 'calendar_today', href: '#/planner' },
  { key: 'projects', label: 'Projects', icon: 'folder', href: '#/projects' },
  { key: 'export', label: 'Export', icon: 'ios_share', href: '#/export' },
  { key: 'settings', label: 'Settings', icon: 'settings', href: '#/settings' },
];

export function bottomNavHTML(active = 'home') {
  return `
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant/50 flex justify-around items-center px-1 pt-1"
      style="padding-bottom:env(safe-area-inset-bottom,0px)">
      ${NAV_ITEMS.map((it) => `
        <a href="${it.href}" class="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${active === it.key ? 'text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}">
          <span class="material-symbols-outlined text-[22px] ${active === it.key ? 'font-bold' : ''}" style="${active === it.key ? "font-variation-settings:'FILL' 1" : ''}">${it.icon}</span>
          <span class="text-[10px] font-medium ${active === it.key ? 'font-bold' : ''}">${it.label}</span>
        </a>`).join('')}
    </nav>`;
}

/* ---------------- Floating Action Button ---------------- */
export function fabHTML(href, label = 'Add') {
  return `<a href="${href}" class="fab bottom-6 right-6 md:bottom-8 md:right-8" aria-label="${label}">${icon('add', 'text-[26px]')}</a>`;
}

/* ---------------- Sync Indicator ---------------- */
export function initSyncIndicator() {
  const el = document.createElement('div');
  el.id = 'sync-indicator';
  el.className = 'fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none opacity-0';
  el.style.bottom = 'calc(76px + env(safe-area-inset-bottom, 0px))';
  el.style.transform = 'translate(-50%, 8px)';
  el.style.display = 'none';
  document.body.appendChild(el);

  let lastSuccessTs = 0;
  let prevPending = 0;

  function render() {
    const ops = queue.getOps();
    const pending = ops.filter((o) => o.status === 'pending' || o.status === 'running').length;
    const failed = ops.filter((o) => o.status === 'error').length;
    const offline = !queue.isOnline();
    const justSaved = prevPending > 0 && pending === 0 && failed === 0;
    prevPending = pending;

    let html = '';
    if (pending > 0) {
      html = `<span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-inverse-surface text-inverse-on-surface shadow-cardlg">
        <svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" stroke-width="3"/><path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
        <span class="text-xs font-semibold">${pending} item${pending > 1 ? 's' : ''} syncing…</span></span>`;
    } else if (justSaved) {
      lastSuccessTs = Date.now();
      html = `<span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-on-primary shadow-cardlg">
        ${icon('check_circle', 'text-[16px]')}<span class="text-xs font-semibold">All saved</span></span>`;
      el.style.display = 'flex';
      el.style.opacity = '1';
      el.style.transform = 'translate(-50%, 0)';
      setTimeout(() => { if (Date.now() - lastSuccessTs >= 1900) hide(); }, 2000);
      return;
    } else if (failed > 0) {
      html = `<button data-retry class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-error text-on-error shadow-cardlg pointer-events-auto">
        ${icon('sync_problem', 'text-[16px]')}<span class="text-xs font-semibold">${failed} failed · Retry</span></button>`;
    } else if (offline) {
      html = `<span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-tertiary-container text-on-tertiary-container shadow-cardlg">
        ${icon('cloud_off', 'text-[16px]')}<span class="text-xs font-semibold">Offline</span></span>`;
    } else {
      el.style.opacity = '0';
      el.style.transform = 'translate(-50%, 8px)';
      setTimeout(() => { if (!queue.pendingCount() && !queue.getOps().some((o) => o.status === 'error')) el.style.display = 'none'; }, 300);
      return;
    }
    el.innerHTML = html;
    el.style.display = 'flex';
    el.style.opacity = '1';
    el.style.transform = 'translate(-50%, 0)';
  }

  function hide() { el.style.opacity = '0'; el.style.transform = 'translate(-50%, 8px)'; setTimeout(() => { el.style.display = 'none'; }, 300); }

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-retry]');
    if (btn) { queue.retryFailed(); }
  });

  queue.subscribe(render);
  store.subscribe(render);
  render();
}
