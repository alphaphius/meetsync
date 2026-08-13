// Small shared helpers

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function uid(prefix = 'id') {
  return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

export function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Strip dangerous HTML from stored summary before rendering
export function sanitizeHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = String(html ?? '');
  div.querySelectorAll('script, iframe, object, embed, style, link, meta').forEach((n) => n.remove());
  div.querySelectorAll('*').forEach((n) => {
    [...n.attributes].forEach((a) => {
      if (a.name.toLowerCase().startsWith('on')) n.removeAttribute(a.name);
      if (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value)) n.removeAttribute(a.name);
    });
  });
  return div.innerHTML;
}

export function nowIso() { return new Date().toISOString(); }

export function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr.length === 10 ? dateStr + 'T00:00:00' : dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtTime(timeStr) {
  if (!timeStr) return '';
  return timeStr;
}

export function fmtDateTime(dateStr, timeStr) {
  const parts = [fmtDate(dateStr)];
  if (timeStr) parts.push(timeStr);
  return parts.join(' · ');
}

export function timeAgo(iso) {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return fmtDate(iso.slice(0, 10));
}

export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const PRIORITY = {
  high:   { label: 'High',   tone: 'error',      bar: 'bg-error',         badge: 'bg-error-container text-on-error-container border border-error/20',       dot: 'bg-error' },
  medium: { label: 'Medium', tone: 'tertiary',   bar: 'bg-tertiary-container', badge: 'bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20', dot: 'bg-tertiary-container' },
  low:    { label: 'Low',    tone: 'secondary',  bar: 'bg-secondary',     badge: 'bg-secondary-fixed text-on-secondary-fixed border border-secondary/20', dot: 'bg-secondary' },
};

export function initials(name) {
  return String(name || '?').trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join('').toUpperCase();
}

export function avatarUrl(avatar) {
  if (!avatar) return '';
  if (/^https?:/.test(avatar)) return avatar;
  return driveFull(avatar);
}

export function isOnline() { return navigator.onLine !== false; }
