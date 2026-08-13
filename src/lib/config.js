// App Script ID (project ID) — edit here or in Settings UI.
// Full /exec URL: https://script.google.com/macros/s/{ID}/exec
export const APP_SCRIPT_ID = '1OEa-bEnytmI0uumOaKST4u8fZnMnuAkmFkx6_byw4J5DE4tb1eBzvXbg';

export const DEFAULT_EXEC_URL = `https://script.google.com/macros/s/${APP_SCRIPT_ID}/exec`;

const EXEC_KEY = 'ms.execUrl';

export function getExecUrl() {
  return localStorage.getItem(EXEC_KEY) || DEFAULT_EXEC_URL;
}
export function setExecUrl(url) {
  localStorage.setItem(EXEC_KEY, url.trim());
}

// Google Drive image URL helpers (folder is shared "anyone with link")
export const driveThumb = (id, w = 480) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${w}`;
export const driveFull = (id) => `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`;

// PWA install
export const APP_THEME_COLOR = '#000666';
