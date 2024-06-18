import CustomWindow from '../lib/custom-window.js'

class AboutWindow {
  constructor() {
    this.instance = null
  }

  create() {
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
      entryFile: '../about/about.html'
    })
  }

  open = () => {
    if (this.instance === null || this.instance.isDestroyed()) {
      this.instance = this.create()
    } else {
      this.instance.focus()
    }
  }
}

export default AboutWindow
