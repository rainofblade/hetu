import fs from 'node:fs'
import { dialog } from 'electron'
import store from '../lib/store.js'
import CustomWindow from '../lib/custom-window.js'
import windowManager from '../lib/window-manager.js'

class FileWindow {
  constructor(appMenu, mainWindow) {
    this.instance = null
    this.appMenu = appMenu
    this.mainWindow = mainWindow
  }

  create() {
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

  open = () => {
    if (this.instance === null || this.instance.isDestroyed()) {
      this.instance = this.create()
    } else {
      this.instance.focus()
    }
  }

  close = () => {
    if (!this.instance.isDestroyed()) {
      this.instance.close()
    }
  }

  openFileDialog = () => {
    const focusedWindow = windowManager.getFocusedWindow()
    dialog
      .showOpenDialog(focusedWindow, {
        title: '打开项目',
        properties: ['openFile'],
        filters: [{ name: '河图项目文件', extensions: ['hp1', 'hp2', 'hpb'] }]
      })
      .then((result) => {
        if (!result.canceled) {
          if (focusedWindow === this.instance) {
            this.close()
          }
          this.loadProject(result.filePaths[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  openFileFromWeb = (event, filePath) => {
    this.openFile(filePath, true)
  }

  openFileFromMenu = (menuItem) => {
    this.openFile(menuItem.label, false)
  }

  openFile = (filePath, fromWeb) => {
    if (fs.existsSync(filePath)) {
      if (fromWeb) {
        this.close()
      }
      this.loadProject(filePath)
    } else {
      dialog.showErrorBox('提示', '项目文件不存在')
      this.deleteNonExistentPath(filePath)
      if (fromWeb) {
        this.instance.reload()
      } else {
        this.appMenu.setRecentDocuments(this.openFileFromMenu)
      }
    }
  }

  deleteNonExistentPath(filePath) {
    let recentDocuments = store.get('recentDocuments')
    let index = recentDocuments.indexOf(filePath)
    if (index > -1) {
      recentDocuments.splice(index, 1)
      store.set('recentDocuments', recentDocuments)
    }
  }

  clearRecentDocumentsFromMenu = () => {
    store.set('recentDocuments', [])
    this.appMenu.setRecentDocuments(this.openFileFromMenu)
  }

  clearRecentDocumentsFromWeb = () => {
    store.set('recentDocuments', [])
    this.instance.reload()
  }

  loadProject = (filePath) => {
    this.mainWindow.open(filePath)
  }
}

export default FileWindow
