// MeetSync entry point — boot, theme, data bootstrap, router, PWA.

import './styles/tokens.css';
import './styles/main.css';
import { registerSW } from 'virtual:pwa-register';
import { init } from './router.js';
import { initSyncIndicator, initSidebar, activeKeyFromHash } from './components/shared.js';
import { store } from './lib/store.js';
import { api } from './lib/api.js';
import { queue, flushNow } from './lib/syncQueue.js';
import { getExecUrl } from './lib/config.js';
import { toast } from './lib/ui.js';

/* ---------- Theme ---------- */
const metaTheme = document.getElementById('meta-theme');

function systemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme() {
  const { theme, accent } = store.get().settings;
  const dark = theme === 'dark' || (theme === 'system' && systemDark());
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.dataset.accent = accent || 'primary';
  const c = getComputedStyle(root).getPropertyValue('--primary');
  metaTheme && metaTheme.setAttribute('content', `rgb(${c.trim()})`);
}
applyTheme();
store.subscribe(applyTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (store.get().settings.theme === 'system') applyTheme();
});

/* ---------- Data bootstrap ---------- */
let booted = false;

async function bootstrap() {
  if (booted) return;
  booted = true;
  store.set({ status: 'loading' });
  try {
    const res = await api.getDashboard();
    if (res && res.data) store.hydrate(res.data);
  } catch (err) {
    store.set({ status: 'error' });
    const cached = store.get();
    const hasData = cached.projects.length || cached.meetings.length;
    if (!hasData) {
      toast.show('Cannot reach the database. Check the API endpoint in Settings.', 'error', 5000);
    }
  } finally {
    store.set({ status: 'ready' });
    flushNow();
  }
}

/* ---------- PWA ---------- */
const swUpdateSW = registerSW({ immediate: true });
swUpdateSW && swUpdateSW.then && swUpdateSW.then(() => {});
if ('serviceWorker' in navigator) {
  let swReloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (swReloaded) return;
    swReloaded = true;
    window.location.reload();
  });
}

/* ---------- Boot ---------- */
const app = document.getElementById('app');
app.innerHTML = '';
initSyncIndicator();
const setActive = initSidebar();
const syncActive = () => setActive(activeKeyFromHash(location.hash));
window.addEventListener('hashchange', syncActive);
init(app);
syncActive();
bootstrap();
