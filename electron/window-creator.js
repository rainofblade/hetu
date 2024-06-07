import { CustomWindow } from './custom-window.js'

const createLoginWindow = () => {
  return new CustomWindow({
    width: 480,
    height: 600,
    titleBarOverlay: {
      // for windows
      color: '#fff',
      symbolColor: '#909399'
    },
    maximizable: false, // for windows
    minimizable: false,
    resizable: false,
    entryFile: 'login.html'
  })
}

const createFileWindow = () => {
  return new CustomWindow({
    width: 800,
    height: 600,
    titleBarOverlay: {
      // for windows
      color: '#fff',
      symbolColor: '#909399'
    },
    maximizable: false, // for windows
    minimizable: false,
    resizable: false,
    entryFile: 'file.html'
  })
}

const createMainWindow = (filePath) => {
  const mainWindow = new CustomWindow({
    width: 1280,
    height: 800,
    titleBarOverlay: {
      // for windos
      color: '#409eff',
      symbolColor: '#fff'
    },
    trafficLightPosition: { x: 12, y: 12 },
    maximize: true,
    entryFile: 'index.html'
  })

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send('update-title', filePath)
  })

  return mainWindow
}

const createSettingWindow = (hashName) => {
  const settingWindow = new CustomWindow({
    width: 680,
    height: 560,
    titleBarOverlay: {
      // for windows
      color: '#fff',
      symbolColor: '#909399'
    },
    maximizable: false, // for windows
    minimizable: false,
    resizable: false,
    entryFile: 'setting.html'
  })

  settingWindow.webContents.on('dom-ready', () => {
    settingWindow.webContents.send('route', hashName)
  })

  return settingWindow
}

const createAboutWindow = () => {
  return new CustomWindow({
    width: 420,
    height: 320,
    titleBarOverlay: {
      // for windows
      color: '#fff',
      symbolColor: '#909399'
    },
    maximizable: false, // for windows
    minimizable: false,
    resizable: false,
    localFile: true,
    entryFile: 'about/about.html'
  })
}

export {
  createLoginWindow,
  createFileWindow,
  createMainWindow,
  createSettingWindow,
  createAboutWindow
}
