// Meeting Editor — New Summary / Edit. Optimistic save + background sync.

import { icon, toast, modal, emptyState } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { queue } from '../lib/syncQueue.js';
import { topBarHTML, backButton } from '../components/shared.js';
import {
  escapeHtml, uid, todayStr, fileToDataURL, sanitizeHTML, formatBytes, isOnline, PRIORITY,
} from '../lib/utils.js';
import { driveThumb } from '../lib/config.js';
import { navigateTo } from '../router.js';

const DRAFT_KEY = 'ms.draft.v1';

export default {
  id: 'editor',
  title: 'Editor',

  render(ctx) {
    const isEdit = Boolean(ctx.params.id);
    const m = isEdit ? store.meeting(ctx.params.id) : null;
    if (isEdit && !m) {
      return `
        ${topBarHTML({ title: 'Meeting', left: backButton() })}
        <main class="max-w-[1200px] mx-auto px-4">${emptyState({ icon: 'search_off', title: 'Meeting not found', message: 'This meeting may have been deleted.', action: '<a href="#/" class="btn btn-primary">Back home</a>' })}</main>`;
    }
    this._draft = loadDraft();
    const draft = !isEdit && this._draft ? this._draft : null;
    const title = isEdit ? (m.title || '') : (draft?.title || '');
    const projectId = isEdit ? (m.projectId || '') : (draft?.projectId || '');
    const priority = isEdit ? (m.priority || 'medium') : (draft?.priority || 'medium');
    const date = isEdit ? (m.date || '') : (draft?.date || todayStr());
    const time = isEdit ? (m.time || '') : (draft?.time || '09:00');
    const participants = isEdit ? (m.participants || []) : (draft?.participants || []);
    const attachments = isEdit ? (m.attachments || []) : (draft?.attachments || []);
    const summary = isEdit ? (m.summary || '') : (draft?.summary || '');

    return `
      ${topBarHTML({
        title: isEdit ? 'Edit Meeting' : 'New Summary',
        left: backButton(),
        right: `<button class="btn btn-primary h-10 px-4" data-save>
          ${icon('save', 'text-[18px]')}<span class="hidden sm:inline">Save</span></button>`,
      })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-32 md:pb-16 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
          <!-- Metadata -->
          <div class="md:col-span-4 flex flex-col gap-4">
            <div class="card p-4 flex flex-col gap-4">
              <div>
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Meeting Title</label>
                <input data-title class="input" placeholder="e.g. Q3 Roadmap Review" value="${escapeHtml(title)}" maxlength="120" />
              </div>
              <div>
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Project</label>
                <div class="relative">
                  <select data-project class="input appearance-none pr-9">
                    <option value="">Select a project…</option>
                    ${store.get().projects.map((p) => `<option value="${escapeHtml(p.id)}" ${p.id === projectId ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('')}
                    <option value="__new__">＋ New project…</option>
                  </select>
                  ${icon('arrow_drop_down', 'absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none')}
                </div>
              </div>
            </div>

            <div class="card p-4">
              <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-2 block">Priority</label>
              <div class="flex bg-surface-container rounded-xl p-1" data-priority>
                ${Object.entries(PRIORITY).map(([k, v]) => `
                  <button data-val="${k}" class="flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all
                    ${priority === k ? (k === 'high' ? 'bg-error-container text-on-error-container' : k === 'medium' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-secondary-fixed text-on-secondary-fixed') : 'text-on-surface-variant hover:bg-surface-variant'}">${v.label}</button>`).join('')}
              </div>
            </div>

            <div class="card p-4 flex flex-col gap-3">
              <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Participants</label>
              <div class="relative">
                ${icon('search', 'absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]')}
                <input data-participant class="input pl-9 py-2 text-[13px]" placeholder="Add names or emails…" autocomplete="off" />
              </div>
              <div data-participants class="flex flex-wrap gap-1.5 min-h-[28px]"></div>
              <div class="flex gap-2">
                <div class="relative flex-1">
                  ${icon('calendar_today', 'absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]')}
                  <input data-date type="date" value="${escapeHtml(date)}" class="input pl-9 py-2 text-[13px]" />
                </div>
                <div class="relative flex-1">
                  ${icon('schedule', 'absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]')}
                  <input data-time type="time" value="${escapeHtml(time)}" class="input pl-9 py-2 text-[13px]" />
                </div>
              </div>
            </div>

            ${isEdit ? `<div class="card p-4 border-error/30">
              <button data-delete class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-error hover:bg-error-container/40 transition-colors text-sm font-semibold">
                ${icon('delete', 'text-[18px]')} Delete meeting</button>
            </div>` : ''}
          </div>

          <!-- Content -->
          <div class="md:col-span-8 flex flex-col gap-4">
            <div class="card p-4 flex flex-col min-h-[320px]">
              <div class="flex items-center justify-between border-b border-surface-variant pb-2.5 mb-2.5">
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  ${icon('description', 'text-[16px]')} Meeting Summary & Details</label>
              </div>
              <div class="flex items-center gap-0.5 text-on-surface-variant overflow-x-auto hide-scrollbar pb-1" data-toolbar>
                ${[['bold','format_bold','Bold'],['italic','format_italic','Italic'],['underline','format_underlined','Underline'],['u_list','format_list_bulleted','Bullet list'],['o_list','format_list_numbered','Numbered list'],['quote','format_quote','Quote'],['link','link','Insert link'],['clear','format_clear','Clear formatting']].map(([k, ic, t]) => `
                  <button class="p-2 rounded-lg hover:bg-surface-variant transition-colors shrink-0" data-cmd="${k}" title="${t}">${icon(ic, 'text-[18px]')}</button>`).join('')}
              </div>
              <div data-editor class="flex-1 min-h-[220px] text-[15px] leading-relaxed text-on-surface focus:outline-none" contenteditable="true" data-placeholder="Start typing the meeting notes here…"></div>
            </div>

            <div class="card p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  ${icon('attach_file', 'text-[16px]')} Attachments <span class="text-outline normal-case font-normal">(${attachments.length})</span></label>
                <button data-add-image class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors text-[13px] font-medium">
                  ${icon('add_photo_alternate', 'text-[17px]')} Add Images</button>
                <input type="file" accept="image/*" multiple hidden data-file />
              </div>
              <div data-attachments class="flex gap-3 overflow-x-auto hide-scrollbar py-1 min-h-[96px]"></div>
              <p class="text-[11px] text-outline mt-2">Images are uploaded to Google Drive when you save. You can keep working — it syncs in the background.</p>
            </div>
          </div>
        </div>
      </main>`;
  },

  mount(ctx) {
    const root = ctx.root;
    const isEdit = Boolean(ctx.params.id);
    const existing = isEdit ? store.meeting(ctx.params.id) : null;
    if (isEdit && !existing) return;

    const state = {
      title: existing ? existing.title : (this._draft?.title || ''),
      projectId: existing ? existing.projectId : (this._draft?.projectId || ''),
      priority: existing ? existing.priority : (this._draft?.priority || 'medium'),
      date: existing ? existing.date : (this._draft?.date || todayStr()),
      time: existing ? existing.time : (this._draft?.time || '09:00'),
      participants: existing ? [...(existing.participants || [])] : [...(this._draft?.participants || [])],
      attachments: existing ? [...(existing.attachments || [])] : [...(this._draft?.attachments || [])],
      summary: existing ? existing.summary : (this._draft?.summary || ''),
    };

    const editor = root.querySelector('[data-editor]');
    const titleInput = root.querySelector('[data-title]');
    const projectSel = root.querySelector('[data-project]');
    const dateInput = root.querySelector('[data-date]');
    const timeInput = root.querySelector('[data-time]');
    const partInput = root.querySelector('[data-participant]');
    const partBox = root.querySelector('[data-participants]');
    const attachBox = root.querySelector('[data-attachments]');
    const fileInput = root.querySelector('[data-file]');

    /* seed */
    titleInput.value = state.title;
    projectSel.value = state.projectId;
    dateInput.value = state.date;
    timeInput.value = state.time;
    editor.innerHTML = state.summary;
    if (!state.summary && !isEdit) editor.innerHTML = '';
    renderParticipants();
    renderAttachments();

    function renderParticipants() {
      partBox.innerHTML = state.participants.length
        ? state.participants.map((p) => `
            <span class="chip bg-secondary-container text-on-secondary-container" data-part="${escapeHtml(p.id)}">
              ${escapeHtml(p.name)}${icon('close', 'text-[14px] cursor-pointer hover:text-error ml-0.5')}</span>`).join('')
        : `<span class="text-[12px] text-outline">No participants added</span>`;
    }

    function renderAttachments() {
      attachBox.innerHTML = state.attachments.map((a, i) => `
        <div class="relative w-24 h-24 rounded-xl border border-outline-variant overflow-hidden group shrink-0">
          <img src="${escapeHtml(a.preview || (a.fileId ? driveThumb(a.fileId, 240) : ''))}" alt="${escapeHtml(a.name || 'attachment')}"
            class="w-full h-full object-cover" loading="lazy" decoding="async" />
          ${a.data ? `<span class="absolute top-1 left-1 bg-surface-container-highest/90 text-on-surface rounded-full px-1.5 py-0.5 text-[10px] font-semibold">new</span>` : ''}
          <button data-remove="${i}" class="absolute top-1 right-1 bg-surface-container-highest/90 text-on-surface p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove">${icon('close', 'text-[14px]')}</button>
        </div>`).join('') +
        `<button data-add-image-2 class="w-24 h-24 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors shrink-0">
          ${icon('add', 'text-[24px]')}<span class="text-[11px] font-medium">Add</span></button>`;
    }

    attachBox.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-remove]');
      if (rm) {
        state.attachments.splice(Number(rm.dataset.remove), 1);
        renderAttachments();
        saveDraft();
        return;
      }
      if (e.target.closest('[data-add-image-2]')) fileInput.click();
    });

    const openPicker = () => fileInput.click();
    root.querySelector('[data-add-image]').addEventListener('click', openPicker);
    fileInput.addEventListener('change', async () => {
      const files = Array.from(fileInput.files || []);
      fileInput.value = '';
      for (const f of files) {
        if (!f.type.startsWith('image/')) { toast.show(`"${f.name}" is not an image.`, 'error'); continue; }
        if (f.size > 8 * 1024 * 1024) { toast.show(`"${f.name}" is over 8MB.`, 'error'); continue; }
        const preview = URL.createObjectURL(f);
        state.attachments.push({ preview, name: f.name, mime: f.type, size: f.size });
      }
      renderAttachments();
      saveDraft();
      toast.show('Images will upload when you save.', 'info', 2400);
    });

    /* participants */
    partInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const name = partInput.value.trim();
        if (name) {
          state.participants.push({ id: uid('p'), name });
          partInput.value = '';
          renderParticipants();
          saveDraft();
        }
      }
    });
    partBox.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-part]');
      if (!chip) return;
      state.participants = state.participants.filter((p) => p.id !== chip.dataset.part);
      renderParticipants();
      saveDraft();
    });

    /* toolbar */
    root.querySelector('[data-toolbar]').addEventListener('mousedown', (e) => e.preventDefault());
    root.querySelector('[data-toolbar]').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cmd]');
      if (!b) return;
      const cmd = b.dataset.cmd;
      editor.focus();
      if (cmd === 'link') {
        const url = prompt('Link URL:');
        if (url) document.execCommand('createLink', false, url);
      } else if (cmd === 'clear') {
        document.execCommand('removeFormat');
      } else {
        const map = { bold: 'bold', italic: 'italic', underline: 'underline', u_list: 'insertUnorderedList', o_list: 'insertOrderedList', quote: 'formatBlock' };
        document.execCommand(map[cmd], false, cmd === 'quote' ? 'blockquote' : null);
      }
      saveDraft();
    });

    /* paste sanitize */
    editor.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
    });
    editor.addEventListener('input', () => { sanitizeContent(); saveDraft(); });
    editor.addEventListener('blur', saveDraft);

    function sanitizeContent() {
      editor.querySelectorAll('script, iframe').forEach((n) => n.remove());
      const html = editor.innerHTML;
      if (sanitizeHTML(html) !== html) editor.innerHTML = sanitizeHTML(html);
    }

    /* inputs → state + draft */
    titleInput.addEventListener('input', (e) => { state.title = e.target.value; saveDraft(); });
    projectSel.addEventListener('change', async (e) => {
      if (e.target.value === '__new__') {
        const name = prompt('New project name:');
        if (name && name.trim()) {
          const p = { id: uid('prj'), name: name.trim(), category: 'General', progress: 0, status: 'active', createdAt: new Date().toISOString() };
          store.upsertProject(p);
          queue.enqueueProjectSave(p);
          e.target.value = p.id;
        } else { e.target.value = state.projectId; }
      }
      state.projectId = e.target.value;
      saveDraft();
    });
    dateInput.addEventListener('change', (e) => { state.date = e.target.value; saveDraft(); });
    timeInput.addEventListener('change', (e) => { state.time = e.target.value; saveDraft(); });
    root.querySelector('[data-priority]').addEventListener('click', (e) => {
      const b = e.target.closest('[data-val]');
      if (!b) return;
      state.priority = b.dataset.val;
      root.querySelectorAll('[data-priority] [data-val]').forEach((el) => {
        el.className = 'flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all text-on-surface-variant hover:bg-surface-variant';
      });
      b.className = `flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${
        state.priority === 'high' ? 'bg-error-container text-on-error-container'
        : state.priority === 'medium' ? 'bg-tertiary-fixed text-on-tertiary-fixed'
        : 'bg-secondary-fixed text-on-secondary-fixed'}`;
      saveDraft();
    });

    /* save */
    root.querySelector('[data-save]').addEventListener('click', () => doSave());

    function doSave() {
      if (!state.title.trim()) {
        toast.show('Please enter a meeting title.', 'warn');
        titleInput.focus();
        return;
      }
      sanitizeContent();
      const meeting = {
        id: existing ? existing.id : uid('mtg'),
        projectId: state.projectId || '',
        title: state.title.trim(),
        summary: editor.innerHTML,
        priority: state.priority,
        date: state.date || todayStr(),
        time: state.time,
        participants: state.participants,
        attachments: state.attachments.map((a) => ({
          fileId: a.fileId || '', name: a.name || 'image', mime: a.mime || 'image/png', size: a.size || 0,
          data: a.data || (a.fileId ? undefined : a.preview?.startsWith('data:') ? a.preview : undefined),
        })),
        status: 'done',
        createdAt: existing?.createdAt || new Date().toISOString(),
      };
      store.upsertMeeting(meeting);
      queue.enqueueMeetingSave(meeting);
      clearDraft();
      toast.show('Saved — syncing in background.', 'success');
      navigateTo(isEdit ? '/meetings/' + meeting.id : '/');
    }

    /* delete */
    root.querySelector('[data-delete]')?.addEventListener('click', async () => {
      const pin = await modal.confirm({
        title: 'Delete meeting',
        message: 'This will permanently remove this meeting from Google Sheets. Enter your security PIN to continue.',
        confirmText: 'Delete',
        danger: true,
        pin: true,
      });
      if (!pin) return;
      const valid = await verifyPin(pin);
      if (!valid) { toast.show('Incorrect PIN.', 'error'); return; }
      store.removeMeeting(existing.id);
      queue.enqueueMeetingDelete(existing.id, pin);
      toast.show('Meeting deleted.', 'success');
      navigateTo('/');
    });

    /* draft */
    function saveDraft() {
      if (isEdit) return;
      const d = { title: state.title, projectId: state.projectId, priority: state.priority, date: state.date, time: state.time, participants: state.participants, attachments: state.attachments.map((a) => ({ ...a })), summary: editor.innerHTML };
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch {}
    }
  },
};

function loadDraft() {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (d && (d.title || d.summary || d.participants?.length || d.attachments?.length)) return d;
  } catch {}
  return null;
}

function clearDraft() { localStorage.removeItem(DRAFT_KEY); }

// Best-effort PIN validation against server-stored pin; fall back to stored setting.
async function verifyPin(pin) {
  const { api } = await import('../lib/api.js');
  try {
    const settings = await api.getSettings();
    if (settings && settings.settings && settings.settings.pin !== undefined) {
      return String(settings.settings.pin) === String(pin);
    }
  } catch {}
  return String(store.get().settings.deletePin) === String(pin);
}
