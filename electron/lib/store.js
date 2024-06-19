import Store from 'electron-store'

const store = new Store()

const deleteNonExistentPath = (filePath) => {
  let recentDocuments = store.get('recentDocuments')
  let index = recentDocuments.indexOf(filePath)
  if (index > -1) {
    recentDocuments.splice(index, 1)
    store.set('recentDocuments', recentDocuments)
  }
}

export { deleteNonExistentPath }

export default store
