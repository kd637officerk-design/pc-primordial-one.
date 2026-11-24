const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const APP_NAME = 'ADV-001';

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 900,
    minHeight: 650,
    title: APP_NAME,
    backgroundColor: '#080b12',
    autoHideMenuBar: false,
    icon: path.join(__dirname, 'assets', 'ADV-001-icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('page-title-updated', event => {
    event.preventDefault();
    win.setTitle(APP_NAME);
  });
  return win;
}

function installMenu() {
  const template = [
    {
      label: 'ADV-001',
      submenu: [
        { label: 'About ADV-001', click: () => shell.openExternal('https://github.com/') },
        { type: 'separator' },
        { role: 'quit', label: 'Exit ADV-001' }
      ]
    },
    {
      label: 'File',
      submenu: [
        { label: 'Add music / video files…', accelerator: 'Ctrl+O', click: () => BrowserWindow.getFocusedWindow()?.webContents.executeJavaScript("document.getElementById('file-in')?.click()") },
        { label: 'Scan a Windows folder…', accelerator: 'Ctrl+Shift+O', click: () => BrowserWindow.getFocusedWindow()?.webContents.executeJavaScript("document.getElementById('folder-in')?.click()") },
        { label: 'Add wallpaper images…', click: () => BrowserWindow.getFocusedWindow()?.webContents.executeJavaScript("document.getElementById('wall-file-in')?.click()") },
        { type: 'separator' },
        { role: 'close' }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        { label: 'Open Timer / Stopwatch', click: () => BrowserWindow.getFocusedWindow()?.webContents.executeJavaScript("document.getElementById('adv-timer-panel').hidden=false") },
        { label: 'Open Settings', click: () => BrowserWindow.getFocusedWindow()?.webContents.executeJavaScript("document.getElementById('settings-btn')?.click()") },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'toggleDevTools' }
      ]
    },
    { label: 'View', submenu: [{ role: 'togglefullscreen' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' }] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.adv001.mediadeck');
  installMenu();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
