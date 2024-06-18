class WindowManager {
  constructor() {
    this.windows = []
    this.focusedWindow = null
  }

  addWindow(window) {
    this.windows.push(window)
  }

  removeWindow(window) {
    const index = this.windows.indexOf(window)
    if (index !== -1) {
      this.windows.splice(index, 1)
    }
  }

  closeAllWindows() {
    // window.close() 会修改 this.windows，需要复制一份
    const windowsToClose = this.windows.slice()
    windowsToClose.forEach((window) => {
      if (!window.isDestroyed()) {
        window.close()
      }
    })
  }

  getAllWindows() {
    return this.windows
  }

  getFocusedWindow() {
    return this.focusedWindow
  }
}

const windowManager = new WindowManager()

export default windowManager
