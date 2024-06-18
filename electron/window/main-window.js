import CustomWindow from '../lib/custom-window.js'

class MainWindow {
  constructor() {
    this.instance = []
  }

  create(filePath) {
    const instance = new CustomWindow({
      width: 1280,
      height: 800,
      minWidth: 1080,
      minHeight: 600,
      titleBarOverlay: {
        // for windos
        color: '#409eff',
        symbolColor: '#fff'
      },
      trafficLightPosition: { x: 8, y: 8 },
      maximizeOnShow: true,
      entryFile: 'index.html'
    })

    instance.webContents.on('dom-ready', () => {
      instance.webContents.send('update-title', filePath)
    })

    return instance
  }

  open = (filePath) => {
    this.instance.push(this.create(filePath))
  }
}

export default MainWindow
