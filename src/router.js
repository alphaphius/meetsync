// Tiny hash router — SPA on GitHub Pages (no server rewrites needed).

import DashboardView from './views/DashboardView.js';
import EditorView from './views/EditorView.js';
import PlannerView from './views/PlannerView.js';
import ProjectsView from './views/ProjectsView.js';
import ProjectDetailView from './views/ProjectDetailView.js';
import ExportView from './views/ExportView.js';
import SettingsView from './views/SettingsView.js';

const routes = [
  { path: '/', view: DashboardView },
  { path: '/planner', view: PlannerView },
  { path: '/meetings/new', view: EditorView },
  { path: '/meetings/:id', view: EditorView },
  { path: '/projects', view: ProjectsView },
  { path: '/projects/:id', view: ProjectDetailView },
  { path: '/export', view: ExportView },
  { path: '/settings', view: SettingsView },
];

function parsePath() {
  const raw = location.hash.replace(/^#/, '') || '/';
  return raw.startsWith('/') ? raw : '/' + raw;
}

function match(path) {
  const segs = path.split('?')[0].split('/').filter(Boolean);
  for (const r of routes) {
    const rsegs = r.path.split('/').filter(Boolean);
    if (rsegs.length !== segs.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < rsegs.length; i++) {
      if (rsegs[i].startsWith(':')) params[rsegs[i].slice(1)] = decodeURIComponent(segs[i]);
      else if (rsegs[i] !== segs[i]) { ok = false; break; }
    }
    if (ok) return { view: r.view, params };
  }
  return { view: DashboardView, params: {} };
}

let root = null;
let current = null;

export function navigateTo(path) {
  if (location.hash === '#' + path) render();
  else location.hash = path;
}

export function render() {
  const path = parsePath();
  const { view, params } = match(path);
  if (current && current.view !== view) {
    try { current.unmount && current.unmount(); } catch {}
  }
  if (!root) return;
  const ctx = { root, params, navigate: navigateTo };
  root.innerHTML = view.render ? view.render(ctx) : '';
  current = { view, params, unmount: view.mount ? view.mount(ctx) : null };
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

export function init(appRoot) {
  root = appRoot;
  window.addEventListener('hashchange', render);
  render();
  return {
    current: () => current,
  };
}

export function refresh() { render(); }
