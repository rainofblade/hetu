import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { windowManager } from './window-manager.js'
import { HOST } from './config.js'

// in ESM __driname is undefined
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

class CustomWindow extends BrowserWindow {
  constructor(options) {
    super({
      show: false,
      frame: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        preload: path.join(dirname, 'preload.js'),
        spellcheck: false
      },
      ...options
    })

    windowManager.addWindow(this)

    this.on('close', () => {
      windowManager.removeWindow(this)
    })

    this.on('focus', () => {
      windowManager.focusedWindow = this
    })

    this.on('blur', () => {
      if (windowManager.focusedWindow === this) {
        windowManager.focusedWindow = null
      }
    })

    this.once('ready-to-show', () => {
      if (!!options.maximizeOnShow) {
        this.maximize()
      }
      this.show()
    })

    if (!!options.localFile) {
      this.loadFile(path.resolve(dirname, options.entryFile))
    } else {
      if (!app.isPackaged) {
        this.loadURL(`${HOST}/${options.entryFile}`)
        this.webContents.openDevTools()
      } else {
        this.loadFile(path.resolve(dirname, 'pages', options.entryFile))
      }
    }
  }
}

export { CustomWindow }
