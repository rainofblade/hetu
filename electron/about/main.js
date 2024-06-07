const version = document.getElementById('version')

;(async () => {
  const appName = await electronAPI.getAppName()
  const appVersion = await electronAPI.getAppVersion()
  version.innerText = `${appName} ${appVersion}`
})()

const info = document.getElementById('info')

info.innerText = `Platform: ${electronAPI.platform}
  Chrome: ${electronAPI.chrome}
  Electron: ${electronAPI.electron}
  Node: ${electronAPI.node}
  V8: ${electronAPI.v8}`
