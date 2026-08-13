// Settings — API endpoint, theme/accent, sync status, PIN, contacts & groups, install.

import { icon, toast, modal, emptyState } from '../lib/ui.js';
import { store, touchLastSync } from '../lib/store.js';
import { queue } from '../lib/syncQueue.js';
import { api, ApiError } from '../lib/api.js';
import { topBarHTML, bottomNavHTML } from '../components/shared.js';
import { escapeHtml, uid, nowIso, timeAgo, initials } from '../lib/utils.js';
import { getExecUrl, setExecUrl } from '../lib/config.js';
import { pwaInstall, onInstallable } from '../lib/pwa.js';

export default {
  id: 'settings',
  title: 'Settings',

  render() {
    const s = store.get();
    const set = s.settings;
    return `
      ${topBarHTML({ title: 'Settings', left: '', right: '' })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Profile -->
          <section class="card p-5 md:col-span-2">
            <div class="flex items-center gap-4">
              <div data-avatar class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-xl font-bold overflow-hidden shrink-0">
                ${set.userAvatar ? `<img src="${escapeHtml(set.userAvatar)}" class="w-full h-full object-cover" alt="Avatar" />` : escapeHtml((set.userName || 'M')[0].toUpperCase())}
              </div>
              <div class="flex-1">
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">Display name</label>
                <input data-name class="input" placeholder="Your name" value="${escapeHtml(set.userName || '')}" maxlength="60" />
              </div>
            </div>
          </section>

          <!-- App customization -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('palette', 'text-primary-container')} App Customization</h2>
            <div class="mb-4">
              <label class="text-[12px] font-medium text-on-surface block mb-1.5">Theme</label>
              <div class="flex bg-surface-container rounded-xl p-1" data-theme-group>
                ${['light', 'dark', 'system'].map((t) => `<button data-theme="${t}" class="flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${set.theme === t ? 'bg-surface-container-lowest shadow text-on-surface' : 'text-on-surface-variant hover:bg-surface-variant'}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}
              </div>
            </div>
            <div>
              <label class="text-[12px] font-medium text-on-surface block mb-2">Accent color</label>
              <div class="flex gap-3" data-accent-group>
                ${[['primary', 'bg-primary-container'], ['secondary', 'bg-secondary-container'], ['tertiary', 'bg-tertiary-fixed']].map(([k, cls]) => `
                  <button data-accent="${k}" aria-label="Accent ${k}" class="w-9 h-9 rounded-full ${cls} transition-all ${set.accent === k ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-60 hover:opacity-100'}"></button>`).join('')}
              </div>
            </div>
          </section>

          <!-- API -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('code', 'text-primary-container')} Apps Script API</h2>
            <label class="text-[12px] font-medium text-on-surface block mb-1.5">/exec Endpoint URL</label>
            <div class="relative">
              <input data-exec class="input pr-24 font-mono text-[12px]" value="${escapeHtml(getExecUrl())}" spellcheck="false" />
              <button data-test class="absolute right-1.5 top-1/2 -translate-y-1/2 btn btn-outline h-8 px-3 text-[12px]">Test</button>
            </div>
            <p data-conn class="text-[12px] text-on-surface-variant mt-2 flex items-center gap-1.5"></p>
          </section>

          <!-- Sync status -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('sync', 'text-primary-container')} Sync</h2>
            <div data-sync-status class="flex flex-col gap-2 text-[13px] text-on-surface-variant"></div>
            <div class="flex gap-2 mt-4">
              <button data-force class="btn btn-outline flex-1 text-[13px]">${icon('refresh', 'text-[16px]')} Force sync</button>
              <button data-clear-errors class="btn btn-outline flex-1 text-[13px] hidden">Clear errors</button>
            </div>
          </section>

          <!-- Security -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('lock', 'text-primary-container')} Security</h2>
            <label class="text-[12px] font-medium text-on-surface block mb-1.5">Delete PIN (4–6 digits)</label>
            <input data-pin type="password" inputmode="numeric" maxlength="6" class="input" placeholder="••••" value="${escapeHtml(set.deletePin || '0000')}" />
            <p class="text-[11px] text-outline mt-2">Required before deleting meetings or projects.</p>
          </section>

          <!-- Contacts & Groups -->
          <section class="card p-5 md:col-span-2">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('group', 'text-primary-container')} Group & Contact Management</h2>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label class="text-[12px] font-medium text-on-surface block mb-1.5">Add contact</label>
                <div class="flex gap-2">
                  <input data-contact class="input flex-1" placeholder="Name" />
                  <input data-contact-email type="email" class="input flex-1" placeholder="Email (optional)" />
                  <button data-add-contact class="btn btn-tonal shrink-0">Add</button>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-4" data-contacts></div>
            <div class="mt-4">
              <label class="text-[12px] font-medium text-on-surface block mb-2">Groups</label>
              <div class="flex flex-wrap gap-2" data-groups>
                <button data-new-group class="chip border border-dashed border-outline-variant hover:bg-surface-container-high">+ New Group</button>
              </div>
            </div>
          </section>

          <!-- Install -->
          <section class="card p-5 md:col-span-2">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-1">${icon('download_for_offline', 'text-primary-container')} Install App</h2>
                <p class="text-[13px] text-on-surface-variant">Install MeetSync on this device for offline use and faster loading.</p>
              </div>
              <button data-install class="btn btn-primary hidden">Install</button>
            </div>
          </section>
        </div>
      </main>
      ${bottomNavHTML('settings')}`;
  },

  mount(ctx) {
    const root = ctx.root;
    const s = store.get();
    const set = s.settings;

    /* theme */
    root.querySelectorAll('[data-theme]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        store.setSettings({ theme });
        root.querySelectorAll('[data-theme]').forEach((b) => {
          b.className = `flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${b.dataset.theme === theme ? 'bg-surface-container-lowest shadow text-on-surface' : 'text-on-surface-variant hover:bg-surface-variant'}`;
        });
      });
    });

    /* accent */
    root.querySelectorAll('[data-accent]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const accent = btn.dataset.accent;
        store.setSettings({ accent });
        root.querySelectorAll('[data-accent]').forEach((b) => {
          b.classList.toggle('ring-2', b.dataset.accent === accent);
          b.classList.toggle('ring-offset-2', b.dataset.accent === accent);
          b.classList.toggle('ring-primary', b.dataset.accent === accent);
          b.classList.toggle('opacity-60', b.dataset.accent !== accent);
        });
      });
    });

    /* name + pin */
    const nameInput = root.querySelector('[data-name]');
    const pinInput = root.querySelector('[data-pin]');

    /* test connection */
    const conn = root.querySelector('[data-conn]');
    root.querySelector('[data-test]').addEventListener('click', async () => {
      const url = root.querySelector('[data-exec]').value.trim();
      if (url) setExecUrl(url);
      conn.innerHTML = `${icon('sync', 'text-[15px] animate-spin')} Testing connection…`;
      try {
        const res = await api.ping();
        conn.innerHTML = `${icon('check_circle', 'text-[16px] text-primary')} Connected — MeetSync backend v${res.version || '?'} responded OK.`;
        toast.show('Connection successful.', 'success');
      } catch (err) {
        conn.innerHTML = `${icon('error', 'text-[16px] text-error')} ${escapeHtml(err.message)}`;
        toast.show('Connection failed.', 'error');
      }
    });

    /* sync status */
    const syncEl = root.querySelector('[data-sync-status]');
    function renderSync() {
      const st = store.get();
      const ops = queue.getOps();
      const pending = ops.filter((o) => o.status === 'pending' || o.status === 'running').length;
      const failed = ops.filter((o) => o.status === 'error').length;
      syncEl.innerHTML = `
        <div class="flex items-center justify-between"><span>Status</span>
          <span class="flex items-center gap-1 font-medium ${queue.isOnline() ? 'text-primary' : 'text-error'}">${queue.isOnline() ? icon('cloud_done', 'text-[16px]') + ' Online' : icon('cloud_off', 'text-[16px]') + ' Offline'}</span></div>
        <div class="flex items-center justify-between"><span>Pending changes</span><span class="font-medium text-on-surface">${pending}</span></div>
        <div class="flex items-center justify-between"><span>Failed</span><span class="font-medium ${failed ? 'text-error' : 'text-on-surface'}">${failed}</span></div>
        <div class="flex items-center justify-between"><span>Last sync</span><span class="font-medium text-on-surface">${st.lastSync ? timeAgo(st.lastSync) : 'never'}</span></div>`;
      root.querySelector('[data-clear-errors]')?.classList.toggle('hidden', failed === 0);
    }
    renderSync();
    const unsubQueue = queue.subscribe(renderSync);

    root.querySelector('[data-force]').addEventListener('click', async () => {
      queue.retryFailed();
      try {
        const res = await api.getDashboard();
        if (res.data) store.hydrate(res.data);
        touchLastSync();
        toast.show('Synced with Google Sheets.', 'success');
        renderSync();
      } catch (err) {
        toast.show(err.message, 'error');
      }
    });
    root.querySelector('[data-clear-errors]').addEventListener('click', () => { queue.clearErrors(); renderSync(); });

    /* save */
    let saveTimer = null;
    const queueSave = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const pin = pinInput.value.trim() || set.deletePin || '0000';
        store.setSettings({ userName: nameInput.value.trim(), deletePin: pin });
        queue.enqueueSettingsSave({ theme: store.get().settings.theme, accent: store.get().settings.accent, userName: nameInput.value.trim(), deletePin: pin });
        toast.show('Settings saved.', 'success');
      }, 600);
    };
    nameInput.addEventListener('input', queueSave);
    pinInput.addEventListener('input', queueSave);

    /* contacts */
    const contactsEl = root.querySelector('[data-contacts]');
    let contacts = [...store.get().contacts];
    function renderContacts() {
      if (!contacts.length) {
        contactsEl.innerHTML = `<span class="text-[12px] text-outline w-full">No contacts yet — add team members to invite them quickly.</span>`;
        return;
      }
      contactsEl.innerHTML = contacts.map((c) => `
        <span class="chip bg-secondary-container text-on-secondary-container" data-cid="${escapeHtml(c.id)}">
          ${c.name}${c.email ? `<span class="text-on-secondary-container/60 ml-0.5">· ${escapeHtml(c.email)}</span>` : ''}
          ${icon('close', 'text-[14px] cursor-pointer hover:text-error ml-0.5')}</span>`).join('');
    }
    renderContacts();
    contactsEl.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-cid]');
      if (!chip) return;
      contacts = contacts.filter((c) => c.id !== chip.dataset.cid);
      queue.enqueueContactsSave(contacts);
      renderContacts();
    });
    root.querySelector('[data-add-contact]').addEventListener('click', () => {
      const name = root.querySelector('[data-contact]').value.trim();
      const email = root.querySelector('[data-contact-email]').value.trim();
      if (!name) { toast.show('Enter a name.', 'warn'); return; }
      contacts.push({ id: uid('ctc'), name, email, createdAt: nowIso() });
      root.querySelector('[data-contact]').value = '';
      root.querySelector('[data-contact-email]').value = '';
      queue.enqueueContactsSave(contacts);
      renderContacts();
      toast.show('Contact added.', 'success');
    });

    /* groups */
    const groupsEl = root.querySelector('[data-groups]');
    let groups = [...store.get().groups];
    function renderGroups() {
      const existing = groups.map((g) => `
        <span class="chip bg-surface-container" data-gid="${escapeHtml(g.id)}">${escapeHtml(g.name)}${icon('close', 'text-[14px] cursor-pointer hover:text-error ml-0.5')}</span>`).join('');
      groupsEl.innerHTML = existing + `<button data-new-group class="chip border border-dashed border-outline-variant hover:bg-surface-container-high">+ New Group</button>`;
    }
    renderGroups();
    groupsEl.addEventListener('click', (e) => {
      const del = e.target.closest('[data-gid]');
      if (del) {
        groups = groups.filter((g) => g.id !== del.dataset.gid);
        queue.enqueueContactsSave(contacts); // reuse contacts op? groups separate
        renderGroups();
        return;
      }
      if (e.target.closest('[data-new-group]')) {
        const name = prompt('Group name:');
        if (name && name.trim()) {
          groups.push({ id: uid('grp'), name: name.trim(), memberIds: [], createdAt: nowIso() });
          renderGroups();
        }
      }
    });

    /* install */
    const installBtn = root.querySelector('[data-install]');
    function refreshInstall() {
      installBtn.classList.toggle('hidden', !pwaInstall.canInstall());
    }
    installBtn.addEventListener('click', async () => {
      const ok = await pwaInstall.prompt();
      if (ok) toast.show('Installing…', 'info');
    });
    refreshInstall();
    onInstallable(refreshInstall);

    const unsub = store.subscribe(renderSync);
    return () => { unsub(); unsubQueue(); };
  },
};
