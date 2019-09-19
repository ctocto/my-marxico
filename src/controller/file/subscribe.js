const { ipcMain } = require('electron')
const File = require('./index')

ipcMain.on('markdown-write', (event, { data, file }) => {
  File.writeFile(file, data, event)
})

ipcMain.on('markdown-read', (event, arg) => {
  // readFile(...arg, event)
})
