import CustomWindow from '../lib/custom-window.js'

class SettingWindow {
  constructor() {
    this.instance = null
  }

  create(path) {
    const instance = new CustomWindow({
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

    instance.webContents.on('dom-ready', () => {
      instance.webContents.send('route', path)
    })

    return instance
  }

  open = (path) => {
    if (this.instance === null || this.instance.isDestroyed()) {
      this.instance = this.create(path)
    } else {
      this.instance.focus()
      this.instance.webContents.send('route', path)
    }
  }
}

export default SettingWindow
