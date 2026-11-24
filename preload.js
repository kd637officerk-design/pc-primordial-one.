// Intentionally minimal preload: file access is granted through Chromium's native
// file/folder pickers and the app's existing import handlers, not unrestricted Node access.
const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('ADV001_DESKTOP', Object.freeze({
  appName: 'ADV-001',
  platform: process.platform,
  desktop: true
}));
