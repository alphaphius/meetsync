// Background sync queue.
// Saves happen optimistically (store updated instantly), then this queue
// pushes changes to Apps Script in the background. The user can navigate
// away immediately — a global indicator shows pending/syncing/error state.
// Offline ops persist locally and flush when connection returns.

import { api } from './api.js';
import { store, touchLastSync } from './store.js';
import { nowIso, isOnline, uid } from './utils.js';

const LS_KEY = 'ms.queue.v2';

export const Q_EVENTS = { changed: 'changed' };

function load() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}

function persist() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(ops)); } catch {}
}

let ops = load();
const listeners = new Set();
let processing = false;
let online = isOnline();

function emit() {
  listeners.forEach((fn) => fn({ ops, online, pending: pendingCount() }));
}

function pendingCount() {
  return ops.filter((o) => o.status === 'pending' || o.status === 'running').length;
}

export const queue = {
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  getOps: () => ops,
  pendingCount,
  isOnline: () => online,

  enqueue(op) {
    ops.push({ id: uid('op'), status: 'pending', attempts: 0, createdAt: nowIso(), ...op });
    persist();
    emit();
    if (!processing) flush();
  },

  enqueueMeetingSave(meeting) {
    this.enqueue({ type: 'saveMeeting', payload: { meeting } });
  },

  enqueueProjectSave(project) {
    this.enqueue({ type: 'saveProject', payload: { project } });
  },

  enqueueMeetingDelete(id, pin) {
    this.enqueue({ type: 'deleteMeeting', payload: { id, pin } });
  },

  enqueueProjectDelete(id, pin) {
    this.enqueue({ type: 'deleteProject', payload: { id, pin } });
  },

  enqueueSettingsSave(settings) {
    this.enqueue({ type: 'saveSettings', payload: { settings } });
  },

  enqueueContactsSave(contacts) {
    this.enqueue({ type: 'saveContacts', payload: { contacts } });
  },

  clearErrors() {
    ops = ops.filter((o) => o.status !== 'error');
    persist(); emit();
  },

  retryFailed() {
    ops.forEach((o) => { if (o.status === 'error') { o.status = 'pending'; o.attempts = 0; } });
    persist(); emit();
    if (!processing) flush();
  },
};

async function flush() {
  if (processing || ops.length === 0) return;
  processing = true;
  online = isOnline();

  // loop over a snapshot; skip blocked ops and re-attempt later
  let guard = 0;
  while (guard++ < 50) {
    const op = ops.find((o) => o.status === 'pending');
    if (!op) break;

    op.status = 'running';
    op.attempts += 1;
    persist(); emit();

    try {
      await runOp(op);
      ops = ops.filter((o) => o.id !== op.id);
      persist();
      if (op.type === 'saveMeeting') {
        // optimistic server echoes already stored; just refresh timestamp
      }
      touchLastSync();
    } catch (err) {
      op.status = 'error';
      op.error = String(err.message || err);
      persist();
    }
    emit();
  }

  processing = false;
}

async function runOp(op) {
  switch (op.type) {
    case 'saveMeeting': {
      const meeting = { ...op.payload.meeting };
      const attachments = meeting.attachments || [];
      const withFiles = [];
      for (const a of attachments) {
        if (a.data) {
          const res = await api.uploadImage({ name: a.name, mime: a.mime, data: a.data });
          if (!res || !res.ok || !res.file) throw new Error('Image upload failed');
          withFiles.push({ fileId: res.file.id, name: a.name, mime: a.mime, size: a.size, url: res.file.url });
        } else {
          withFiles.push(a);
        }
      }
      meeting.attachments = withFiles;
      const res = await api.saveMeeting(meeting);
      if (res && res.meeting) store.upsertMeeting(res.meeting);
      break;
    }
    case 'saveProject': {
      const res = await api.saveProject(op.payload.project);
      if (res && res.project) store.upsertProject(res.project);
      break;
    }
    case 'deleteMeeting': {
      const res = await api.deleteMeeting(op.payload.id, op.payload.pin);
      if (res && res.ok) store.removeMeeting(op.payload.id);
      break;
    }
    case 'deleteProject': {
      const res = await api.deleteProject(op.payload.id, op.payload.pin);
      if (res && res.ok) store.removeProject(op.payload.id);
      break;
    }
    case 'saveSettings': await api.saveSettings(op.payload.settings); break;
    case 'saveContacts': await api.saveContacts(op.payload.contacts); break;
    case 'saveGroups': await api.saveGroups(op.payload.groups); break;
    case 'saveExport': await api.saveExport(op.payload.exp); break;
    default: throw new Error(`Unknown op type: ${op.type}`);
  }
}

// Online/offline watching
window.addEventListener('online', () => { online = true; emit(); flush(); });
window.addEventListener('offline', () => { online = false; emit(); });

export function flushNow() { if (!processing) flush(); }
