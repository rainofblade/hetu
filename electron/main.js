import { app, ipcMain, shell, globalShortcut } from 'electron'
import { HELP_URL } from './config.js'
import store from './lib/store.js'
import windowManager from './lib/window-manager.js'
import AppMenu from './menu/app-menu.js'
import MainWindow from './window/main-window.js'
import FileWindow from './window/file-window.js'
import LoginWindow from './window/login-window.js'
import AboutWindow from './window/about-window.js'
import SettingWindow from './window/setting-window.js'

// if (require('electron-squirrel-startup')) app.quit()

const appMenu = new AppMenu()
const mainWindow = new MainWindow()
const fileWindow = new FileWindow(appMenu, mainWindow)
const loginWindow = new LoginWindow(appMenu, fileWindow)
const aboutWindow = new AboutWindow()
const settingWindow = new SettingWindow()

const openHelpURL = () => {
  shell.openExternal(HELP_URL)
}

const APP_MENU_TPL = [
  {
    label: app.name, // package.json producName，开发环境不可修改
    submenu: [
      { label: `关于 ${app.name}`, click: aboutWindow.open },
      {
        label: '设置…',
        accelerator: 'CmdOrCtrl+,',
        click: () => {
          settingWindow.open('/')
        }
      },
      {
        label: '检查更新…',
        click: () => {
          settingWindow.open('/update')
        }
      },
      { type: 'separator' },
      { label: '切换账号', click: loginWindow.switchAccount },
      { label: `退出 ${app.name}`, role: 'quit' }
    ]
  },
  {
    label: '文件',
    submenu: [
      { label: '新建项目…', accelerator: 'CmdOrCtrl+N', click: fileWindow.open },
      { type: 'separator' },
      { label: '打开项目…', accelerator: 'CmdOrCtrl+O', click: fileWindow.openFileDialog },
      { label: '打开最近的项目', submenu: [] }
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

const RECENT_SUBMENU_TPL = [
  { type: 'separator' },
  { label: '清除最近的项目', click: fileWindow.clearRecentDocumentsFromMenu }
]

const handleMenuClick = (event, command) => {
  switch (command) {
    case 'about':
      aboutWindow.open()
      break
    case 'setting':
      settingWindow.open('/')
      break
    case 'update':
      settingWindow.open('/update')
      break
    case 'switch':
      loginWindow.switchAccount()
      break
    case 'quit':
      app.quit()
      break
    case 'new':
      fileWindow.open()
      break
    case 'open':
      fileWindow.openFileDialog()
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

app.whenReady().then(() => {
  // 进程通信
  ipcMain.on('login', loginWindow.login)
  ipcMain.on('open-dialog', fileWindow.openFileDialog)
  ipcMain.on('open-file', fileWindow.openFileFromWeb)
  ipcMain.on('menu-click', handleMenuClick) // for Windows
  ipcMain.on('clear-recent-documents', fileWindow.clearRecentDocumentsFromWeb)
  ipcMain.handle('set', (event, key, value) => store.set(key, value))
  ipcMain.handle('get', (event, key) => store.get(key))
  ipcMain.handle('get-app-name', () => app.name)
  ipcMain.handle('get-app-version', () => app.getVersion())

  // 事件绑定
  app.on('activate', () => {
    // only for Mac
    if (windowManager.getAllWindows().length === 0) {
      if (!loginWindow.isLogin) {
        loginWindow.open()
      } else {
        fileWindow.open()
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

  // 创建菜单
  appMenu.addTemplate(APP_MENU_TPL, RECENT_SUBMENU_TPL)
  appMenu.setRecentDocuments(fileWindow.openFileFromMenu)

  loginWindow.open()
})
