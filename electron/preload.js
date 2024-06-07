const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 渲染进程 -> 主进程
  login: () => ipcRenderer.send('login'),
  openDialog: () => ipcRenderer.send('open-dialog'),
  openFile: (filePath) => ipcRenderer.send('open-file', filePath),

  // 渲染进程 -> 主进程 -> 渲染进程
  set: (key, value) => ipcRenderer.invoke('set', key, value),
  get: (key) => ipcRenderer.invoke('get', key),
  getAppName: () => ipcRenderer.invoke('get-app-name'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  // 主进程 -> 渲染进程
  onUpdateTitle: (callback) => ipcRenderer.on('update-title', (event, title) => callback(title)),
  onRoute: (callback) => ipcRenderer.on('route', (event, hashName) => callback(hashName)),

  // 系统信息
  platform: process.platform,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node,
  v8: process.versions.v8
})
