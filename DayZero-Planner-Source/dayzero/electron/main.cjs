const { app, BrowserWindow, Notification, ipcMain, shell } = require('electron');
const path = require('node:path');
let win;
function createWindow() {
  win = new BrowserWindow({ width: 1380, height: 900, minWidth: 360, minHeight: 640, backgroundColor: '#0a0c0f', title: 'DAYZERO', webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
ipcMain.handle('dayzero:notify', (_event, payload) => {
  if (!Notification.isSupported()) return false;
  const n = new Notification({ title: String(payload?.title || 'DAYZERO'), body: String(payload?.body || 'Your plan is waiting.'), silent: false }); n.show(); return true;
});