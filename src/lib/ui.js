// Shared UI helpers: icons, toasts, modals, small renderers.

import { escapeHtml, initials, PRIORITY } from './utils.js';

let toastRoot = null;
let modalRoot = null;

export function icon(name, cls = '') {
  return `<span class="material-symbols-outlined ${cls}" aria-hidden="true">${name}</span>`;
}

/* ---------------- Toasts ---------------- */
export const toast = {
  show(message, type = 'info', duration = 3200) {
    if (!toastRoot) {
      toastRoot = document.createElement('div');
      toastRoot.className = 'fixed left-1/2 -translate-x-1/2 z-[120] flex flex-col items-center gap-2 px-4 w-full max-w-md pointer-events-none';
      toastRoot.style.bottom = 'calc(88px + env(safe-area-inset-bottom, 0px))';
      document.body.appendChild(toastRoot);
    }
    const el = document.createElement('div');
    const colors = {
      info: 'bg-inverse-surface text-inverse-on-surface',
      success: 'bg-primary text-on-primary',
      error: 'bg-error text-on-error',
      warn: 'bg-tertiary-container text-on-tertiary-container',
    };
    const ic = { info: 'info', success: 'check_circle', error: 'error', warn: 'warning' };
    el.className = `flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-cardlg ${colors[type] || colors.info} fade-anim max-w-full`;
    el.innerHTML = `${icon(ic[type] || 'info', 'text-[18px] shrink-0')}<span class="text-sm font-medium leading-tight break-words">${escapeHtml(message)}</span>`;
    toastRoot.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .3s ease, transform .3s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(() => el.remove(), 300);
    }, duration);
  },
};

/* ---------------- Modal ---------------- */
function ensureModalRoot() {
  if (modalRoot) return modalRoot;
  modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
  return modalRoot;
}

function openModal(html) {
  const root = ensureModalRoot();
  const wrap = document.createElement('div');
  wrap.className = 'fixed inset-0 z-[110] flex items-center justify-center p-4';
  wrap.style.background = 'rgba(0,0,0,.45)';
  wrap.style.backdropFilter = 'blur(4px)';
  wrap.innerHTML = html;
  root.appendChild(wrap);

  const close = (val) => {
    wrap.style.opacity = '0';
    wrap.style.transition = 'opacity .2s ease';
    setTimeout(() => wrap.remove(), 200);
    wrap._resolve && wrap._resolve(val);
  };
  wrap._close = close;
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(null); });
  return wrap;
}

export const modal = {
  confirm({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', danger = false, pin = null }) {
    return new Promise((resolve) => {
      const wrap = openModal(`
        <div class="card p-6 w-full max-w-sm fade-anim scale-in-anim" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
          <div class="flex items-center gap-3 mb-3 ${danger ? 'text-error' : 'text-primary'}">
            ${icon(danger ? 'lock' : 'help', 'text-[22px]')}
            <h3 class="text-lg font-semibold text-on-surface">${escapeHtml(title)}</h3>
          </div>
          <p class="text-sm text-on-surface-variant mb-4 leading-relaxed">${escapeHtml(message)}</p>
          ${pin ? `
          <input type="password" inputmode="numeric" maxlength="6" placeholder="Security PIN"
            class="input mb-1 text-center text-xl tracking-[0.5em]" data-pin />
          <p class="text-xs text-on-surface-variant mb-3">Enter your security PIN to continue.</p>` : ''}
          <div class="flex gap-3 mt-4">
            <button class="btn btn-outline flex-1" data-act="cancel">${escapeHtml(cancelText)}</button>
            <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} flex-1" data-act="ok">${escapeHtml(confirmText)}</button>
          </div>
        </div>`);
      wrap._resolve = (val) => resolve(val);
      wrap.querySelector('[data-act="cancel"]').addEventListener('click', () => wrap._close(null));
      wrap.querySelector('[data-act="ok"]').addEventListener('click', () => {
        const pinVal = pin ? (wrap.querySelector('[data-pin]').value || '').trim() : null;
        wrap._close(pinVal);
      });
      const pinInput = wrap.querySelector('[data-pin]');
      if (pinInput) pinInput.focus();
    });
  },
  dismiss() { modalRoot && modalRoot.childNodes.forEach((n) => n._close && n._close(null)); },
};

/* ---------------- Renderers ---------------- */
export function priorityBadge(p) {
  const meta = PRIORITY[p] || PRIORITY.medium;
  return `<span class="badge ${meta.badge}">${meta.label} Priority</span>`;
}

export function avatarStack(participants, size = 8, max = 3) {
  const list = Array.isArray(participants) ? participants : [];
  const shown = list.slice(0, max);
  const extra = list.length - shown.length;
  let html = `<div class="flex -space-x-2">`;
  shown.forEach((p) => {
    if (p.avatar) {
      html += `<img class="w-${size} h-${size} rounded-full border-2 border-surface-container-lowest object-cover" loading="lazy" decoding="async"
        src="${escapeHtml(p.avatar)}" alt="${escapeHtml(p.name || '')}" />`;
    } else {
      html += `<div class="w-${size} h-${size} rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center text-[10px] font-semibold text-on-surface-variant">${escapeHtml(initials(p.name))}</div>`;
    }
  });
  if (extra > 0) {
    html += `<div class="w-${size} h-${size} rounded-full border-2 border-surface-container-lowest bg-surface-container flex items-center justify-center text-[10px] font-semibold text-on-surface-variant">+${extra}</div>`;
  }
  html += `</div>`;
  return html;
}

export function emptyState({ icon: ic = 'inbox', title, message, action }) {
  return `
    <div class="flex flex-col items-center justify-center text-center py-12 px-6 fade-anim">
      <div class="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
        ${icon(ic, 'text-[32px]')}
      </div>
      <h3 class="text-base font-semibold text-on-surface mb-1">${escapeHtml(title)}</h3>
      <p class="text-sm text-on-surface-variant max-w-xs mb-5">${escapeHtml(message)}</p>
      ${action || ''}
    </div>`;
}

export function skeletonCard(h = 120) {
  return `<div class="skeleton w-full" style="height:${h}px"></div>`;
}
