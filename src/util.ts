const isMac = navigator.userAgent.toLowerCase().includes('mac')
const isWindows = navigator.userAgent.toLowerCase().includes('win')

const getFileName = (filePath: string) => {
  const separator = isMac ? '/' : '\\'
  return filePath.substring(filePath.lastIndexOf(separator) + 1).replace(/.(hp1|hp2|hpb)$/, '')
}

const getFileTag = (filePath: string) => {
  return filePath.match(/.hp1$/) ? '一维模型' : filePath.match(/.hp2$/) ? '二维模型' : '水工建筑'
}

export { isMac, isWindows, getFileName, getFileTag }
