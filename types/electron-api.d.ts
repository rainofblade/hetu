// Type definitions for Native API called by JavaScript in browser enviroment

export interface IElectronAPI {
  login(): void
  openDialog(): void
  openFile(filePath: string): void

  set(key: string, value: any): Promise<any>
  get(key: string): Promise<any>
  getAppName(): Promise<string>
  getAppVersion(): Promise<string>

  onUpdateTitle(callback: (title: string) => void): Electron.IpcRenderer
  onRoute(callback: (path: string) => void): Electron.IpcRenderer

  platform: string
  chrome: string
  electron: string
  node: string
  v8: string
}

declare global {
  const electronAPI: IElectronAPI
}
