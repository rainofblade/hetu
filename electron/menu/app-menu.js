import { Menu } from 'electron'
import store from '../lib/store.js'

const MAX_DOCS_NUM = 8

class AppMenu {
  constructor() {}

  bindTemplate = (tpl, recentDocsTpl) => {
    this.tpl = tpl
    this.recentDocsTpl = recentDocsTpl
  }

  render = () => {
    const menu = Menu.buildFromTemplate(this.tpl)
    Menu.setApplicationMenu(menu)
  }

  enable = (...index) => {
    for (const i of index) {
      this.tpl[i].enabled = true
    }
    this.render()
  }

  disable = (...index) => {
    for (const i of index) {
      this.tpl[i].enabled = false
    }
    this.render()
  }

  setRecentDocuments = (callback) => {
    this.tpl[1].submenu[3].submenu = this.recentDocsTpl.slice() // 重置
    const submenu = this.tpl[1].submenu[3].submenu

    let recentDocuments = store.get('recentDocuments')
    if (typeof recentDocuments !== 'undefined' && recentDocuments.length !== 0) {
      for (let i = Math.min(MAX_DOCS_NUM, recentDocuments.length) - 1; i > -1; i--) {
        submenu.unshift({ label: recentDocuments[i], click: callback })
      }
    } else {
      submenu.unshift({ label: '无', enabled: false })
    }

    this.render()
  }
}

export default AppMenu
