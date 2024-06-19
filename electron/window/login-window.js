import { dialog } from 'electron'
import store from '../lib/store.js'
import CustomWindow from '../lib/custom-window.js'
import windowManager from '../lib/window-manager.js'

class LoginWindow {
  constructor(appMenu, fileWindow) {
    this.isLogin = false
    this.instance = null
    this.appMenu = appMenu
    this.fileWindow = fileWindow
  }

  create() {
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

  open = () => {
    this.instance = this.create()
    this.appMenu.disable(1)
  }

  close = () => {
    this.instance.close()
    this.appMenu.enable(1)
  }

  login = () => {
    this.isLogin = true
    this.close()
    this.fileWindow.open()
  }

  switchAccount = () => {
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
          this.isLogin = false
          this.open()
        }
      })
  }
}

export default LoginWindow
