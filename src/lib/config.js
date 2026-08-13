// Apps Script web-app deployment URL.
// Note: modern Apps Script uses the *deployment ID* in the URL, not the project ID.
// Find it via: Clasp → `clasp deployments`, or the Apps Script UI → Deployments.
// Override anytime in the app UI (Settings → API Endpoint).
export const APP_SCRIPT_ID = '1OEa-bEnytmI0uumOaKST4u8fZnMnuAkmFkx6_byw4J5DE4tb1eBzvXbg';

export const DEFAULT_EXEC_URL = 'https://script.google.com/macros/s/AKfycby0yBQsZ9asgmGNUbeOLz0y5GhXTRpMFSdP0WB_Cef-MLO6o0ZkgtmR2892bxgwXd7Y/exec';

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
