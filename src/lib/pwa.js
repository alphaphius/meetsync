// PWA install + service worker helpers.

let deferredInstall = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstall = e;
  window.dispatchEvent(new CustomEvent('ms:installable'));
});

export const pwaInstall = {
  canInstall: () => Boolean(deferredInstall),
  async prompt() {
    if (!deferredInstall) return false;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    return true;
  },
};

export function onInstallable(fn) {
  window.addEventListener('ms:installable', fn);
  if (deferredInstall) fn();
}
