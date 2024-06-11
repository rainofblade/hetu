import { app, globalShortcut, ipcMain, dialog, Menu, shell } from 'electron'
import Store from 'electron-store'
import { windowManager } from './window-manager.js'
import {
  createLoginWindow,
  createFileWindow,
  createMainWindow,
  createSettingWindow,
  createAboutWindow
} from './window-creator.js'
import { HELP_URL } from './config.js'

// if (require('electron-squirrel-startup')) app.quit()

const store = new Store()

/*
 ---------------------------------- 
 loginWindow
 ---------------------------------- 
*/
let loginWindow = null
let isLogin = false

const openLoginWindow = () => {
  loginWindow = createLoginWindow()
  disableMenu(1)
}

const closeLoginWindow = () => {
  loginWindow.close()
  enableMenu(1)
}

const handleLogin = () => {
  isLogin = true
  closeLoginWindow()
  openFileWindow()
}

const switchAccount = () => {
  dialog
    .showMessageBox({
      title: '切换账号',
      type: 'question',
      buttons: ['取消', '确定'],
      defaultId: 0,
      detail: '退出当前登录的账号'
    })
    .then((result) => {
      if (result.response === 1) {
        // TODO: logout请求
        windowManager.closeAllWindows()
        store.clear()
        openLoginWindow()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

/*
 ---------------------------------- 
 fileWindow
 ---------------------------------- 
*/
let fileWindow = null

const openFileWindow = () => {
  if (fileWindow === null || fileWindow.isDestroyed()) {
    fileWindow = createFileWindow()
  } else {
    fileWindow.focus()
  }
}

const closeFileWindow = () => {
  if (!fileWindow.isDestroyed()) {
    fileWindow.close()
  }
}

const handleOpenDialog = () => {
  const focusedWindow = windowManager.getFocusedWindow()
  dialog
    .showOpenDialog(focusedWindow, {
      title: '打开项目',
      properties: ['openFile'],
      filters: [{ name: '河图项目文件', extensions: ['hp1', 'hp2', 'hpb'] }]
    })
    .then((result) => {
      if (!result.canceled) {
        if (focusedWindow === fileWindow) {
          closeFileWindow()
        }
        loadProject(result.filePaths[0])
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleOpenFile = (event, filePath) => {
  closeFileWindow()
  loadProject(filePath)
}

const loadProject = (filePath) => {
  openMainWindow(filePath)
}

/*
 ---------------------------------- 
 aboutWindow
 ---------------------------------- 
*/
let aboutWindow = null

const openAboutWindow = () => {
  if (aboutWindow === null || aboutWindow.isDestroyed()) {
    aboutWindow = createAboutWindow()
  } else {
    aboutWindow.focus()
  }
}

/*
 ---------------------------------- 
 settingWindow
 ---------------------------------- 
*/
let settingWindow = null

const openSettingWindow = (path) => {
  if (settingWindow === null || settingWindow.isDestroyed()) {
    settingWindow = createSettingWindow(path)
  } else {
    settingWindow.focus()
    settingWindow.webContents.send('route', path)
  }
}

/*
 ---------------------------------- 
 help
 ---------------------------------- 
*/
const openHelpURL = () => {
  shell.openExternal(HELP_URL)
}

/*
 ---------------------------------- 
 mainWindow
 ---------------------------------- 
*/
let mainWindows = [] // 多实例

const openMainWindow = (filePath) => {
  mainWindows.push(createMainWindow(filePath))
}

/*
 ---------------------------------- 
 Menu
 ---------------------------------- 
*/
const MENU_TPL = [
  {
    label: app.name, // package.json producName，开发环境不可修改
    submenu: [
      { label: `关于 ${app.name}`, click: openAboutWindow },
      {
        label: '设置…',
        accelerator: 'CmdOrCtrl+,',
        click: () => {
          openSettingWindow('/')
        }
      },
      {
        label: '检查更新…',
        click: () => {
          openSettingWindow('/update')
        }
      },
      { type: 'separator' },
      { label: '切换账号', click: switchAccount },
      { label: `退出 ${app.name}`, role: 'quit' }
    ]
  },
  {
    label: '文件',
    submenu: [
      { label: '新建项目…', accelerator: 'CmdOrCtrl+N', click: openFileWindow },
      { type: 'separator' },
      { label: '打开项目…', accelerator: 'CmdOrCtrl+O', click: handleOpenDialog },
      {
        label: '打开最近的项目',
        role: 'recentDocuments',
        submenu: [{ type: 'separator' }, { label: '清除最近的项目', role: 'clearRecentDocuments' }]
      }
    ]
  },
  {
    label: '窗口',
    role: 'windowMenu',
    submenu: [
      { label: '最小化', role: 'minimize' },
      { label: '关闭', role: 'close' },
      { type: 'separator' },
      { label: '切换全屏', role: 'togglefullscreen' }
    ]
  },
  {
    label: '帮助',
    submenu: [{ label: '帮助文档', click: openHelpURL }]
  }
]

const renderAppMenu = () => {
  const menu = Menu.buildFromTemplate(MENU_TPL)
  Menu.setApplicationMenu(menu)
}

const enableMenu = (...index) => {
  for (const i of index) {
    MENU_TPL[i].enabled = true
  }
  renderAppMenu()
}

const disableMenu = (...index) => {
  for (const i of index) {
    MENU_TPL[i].enabled = false
  }
  renderAppMenu()
}

const handleMenuClick = (event, command) => {
  switch (command) {
    case 'about':
      openAboutWindow()
      break
    case 'setting':
      openSettingWindow('/')
      break
    case 'update':
      openSettingWindow('/update')
      break
    case 'switch':
      switchAccount()
      break
    case 'quit':
      app.quit()
      break
    case 'new':
      openFileWindow()
      break
    case 'open':
      handleOpenDialog()
      break
    case 'minimize':
      windowManager.getFocusedWindow().minimize()
      break
    case 'close':
      windowManager.getFocusedWindow().close()
      break
    case 'toggle':
      const focusedWindow = windowManager.getFocusedWindow()
      focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      break
    case 'help':
      openHelpURL()
      break
    default:
      console.log('No command handler')
  }
}

/*
 ---------------------------------- 
 App
 ---------------------------------- 
*/
app.whenReady().then(() => {
  // 进程通信
  ipcMain.on('login', handleLogin)
  ipcMain.on('open-dialog', handleOpenDialog)
  ipcMain.on('open-file', handleOpenFile)
  ipcMain.on('menu-click', handleMenuClick)
  ipcMain.handle('set', (event, key, value) => store.set(key, value))
  ipcMain.handle('get', (event, key) => store.get(key))
  ipcMain.handle('get-app-name', () => app.name)
  ipcMain.handle('get-app-version', () => app.getVersion())

  // 事件绑定
  app.on('activate', () => {
    // only for Mac
    if (windowManager.getAllWindows().length === 0) {
      if (!isLogin) {
        openLoginWindow()
      } else {
        openFileWindow()
      }
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('will-quit', () => {
    // TODO: logout请求
    globalShortcut.unregisterAll()
  })

  // 注册快捷键
  globalShortcut.register('Esc', () => {
    if (windowManager.getAllWindows().length !== 0) {
      const focusedWindow = windowManager.getFocusedWindow()
      if (focusedWindow && focusedWindow.isFullScreen()) {
        focusedWindow.setFullScreen(false)
      }
    }
  })

  renderAppMenu()

  openLoginWindow()
})
