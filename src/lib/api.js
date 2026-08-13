// Apps Script web-app client.
// CORS-safe: GET = query params, POST = JSON body sent as text/plain (no preflight).

import { getExecUrl } from './config.js';

const DEFAULT_TIMEOUT = 20000;

async function fetchWithTimeout(url, options, timeout = DEFAULT_TIMEOUT) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal, redirect: 'follow' });
  } finally {
    clearTimeout(t);
  }
}

export class ApiError extends Error {
  constructor(message, status = 0) { super(message); this.status = status; }
}

export async function request(action, { method = 'GET', payload, timeout } = {}) {
  const base = getExecUrl();
  let url = `${base}?action=${encodeURIComponent(action)}`;
  if (method === 'GET') url += `&r=${Date.now()}`;

  let res;
  try {
    res = await fetchWithTimeout(url, {
      method,
      headers: method === 'POST' ? { 'Content-Type': 'text/plain;charset=utf-8' } : undefined,
      body: method === 'POST' ? JSON.stringify(payload ?? {}) : undefined,
    }, timeout);
  } catch (err) {
    if (err.name === 'AbortError') throw new ApiError('Request timed out. Check your connection.', 0);
    throw new ApiError('Network error. You may be offline.', 0);
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new ApiError(`Server returned an invalid response (${res.status}).`);
  }
  if (data && data.ok === false) throw new ApiError(data.error || 'Server error', res.status);
  return data;
}

export const api = {
  ping() { return request('ping', { timeout: 12000 }); },
  getDashboard() { return request('getDashboard'); },
  getProjects() { return request('getProjects'); },
  getMeetings(projectId) { return request('getMeetings', { payload: { projectId }, method: 'POST' }); },
  getContacts() { return request('getContacts'); },
  getGroups() { return request('getGroups'); },
  getSettings() { return request('getSettings'); },
  getExports() { return request('getExports'); },

  saveProject(project) { return request('saveProject', { method: 'POST', payload: { project } }); },
  saveMeeting(meeting) { return request('saveMeeting', { method: 'POST', payload: { meeting } }); },
  deleteMeeting(id, pin) { return request('deleteMeeting', { method: 'POST', payload: { id, pin } }); },
  deleteProject(id, pin) { return request('deleteProject', { method: 'POST', payload: { id, pin } }); },
  saveContacts(contacts) { return request('saveContacts', { method: 'POST', payload: { contacts } }); },
  saveGroups(groups) { return request('saveGroups', { method: 'POST', payload: { groups } }); },
  saveSettings(settings) { return request('saveSettings', { method: 'POST', payload: { settings } }); },
  saveExport(exp) { return request('saveExport', { method: 'POST', payload: { export: exp } }); },

  // data: base64 data URL
  uploadImage(file) { return request('uploadImage', { method: 'POST', payload: { name: file.name, mime: file.mime, data: file.data }, timeout: 60000 }); },
};

// Image upload used by syncQueue for meeting attachments
export async function uploadAttachmentFile(file) {
  const res = await api.uploadImage(file);
  if (!res.ok || !res.file) throw new ApiError('Image upload failed');
  return res.file;
}
