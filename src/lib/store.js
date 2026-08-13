// In-memory reactive store persisted to localStorage.
// Source of truth on the client; server sync happens through the queue.

import { nowIso } from './utils.js';

const LS_KEY = 'ms.store.v1';

const defaults = {
  projects: [],
  meetings: [],
  contacts: [],
  groups: [],
  settings: {
    theme: 'light',          // light | dark | system
    accent: 'primary',       // primary | secondary | tertiary
    deletePin: '0000',
    userName: '',
    userAvatar: '',
  },
  lastSync: null,
  serverTime: null,
  status: 'idle',            // idle | loading | online | offline | error
};

let state = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return structuredClone(defaults);
    return { ...structuredClone(defaults), ...JSON.parse(raw) };
  } catch {
    return structuredClone(defaults);
  }
}

function persist() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    // storage full — drop attachments blobs before giving up
    try {
      state.meetings.forEach((m) => { m.attachments = (m.attachments || []).map((a) => ({ ...a, preview: undefined })); });
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {}
  }
}

export const store = {
  get: () => state,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  emit() { listeners.forEach((fn) => fn(state)); },
  set(patch) {
    state = { ...state, ...patch };
    persist();
    this.emit();
  },
  setSettings(patch) {
    state.settings = { ...state.settings, ...patch };
    persist();
    this.emit();
  },
  reset() { state = structuredClone(defaults); persist(); this.emit(); },
  hydrate(data) {
    state = {
      ...state,
      projects: data.projects ?? state.projects,
      meetings: data.meetings ?? state.meetings,
      contacts: data.contacts ?? state.contacts,
      groups: data.groups ?? state.groups,
      serverTime: data.serverTime ?? null,
      status: 'online',
    };
    persist();
    this.emit();
  },
  upsertMeeting(meeting) {
    const i = state.meetings.findIndex((m) => m.id === meeting.id);
    if (i >= 0) state.meetings[i] = { ...state.meetings[i], ...meeting };
    else state.meetings.unshift(meeting);
    persist();
    this.emit();
  },
  upsertProject(project) {
    const i = state.projects.findIndex((p) => p.id === project.id);
    if (i >= 0) state.projects[i] = { ...state.projects[i], ...project };
    else state.projects.push(project);
    persist();
    this.emit();
  },
  removeMeeting(id) {
    state.meetings = state.meetings.filter((m) => m.id !== id);
    persist();
    this.emit();
  },
  removeProject(id) {
    state.projects = state.projects.filter((p) => p.id !== id);
    state.meetings = state.meetings.filter((m) => m.projectId !== id);
    persist();
    this.emit();
  },
  meeting(id) { return state.meetings.find((m) => m.id === id); },
  project(id) { return state.projects.find((p) => p.id === id); },
  meetingsForProject(id) {
    return state.meetings
      .filter((m) => m.projectId === id)
      .sort((a, b) => String(b.date + ' ' + b.time).localeCompare(String(a.date + ' ' + a.time)));
  },
};

export function touchLastSync() {
  state.lastSync = nowIso();
  persist();
  store.emit();
}
