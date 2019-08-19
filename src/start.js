// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron')

global.log = require('./utils/log')

const { app, dialog } = electron
const { BrowserWindow } = electron

const path = require('path')
const url = require('url')
const { Updater, autoUpdater } = require('./updater')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const startUrl = process.env.ELECTRON_START_URL
  || url.format({
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true,
  })

  mainWindow.loadURL(startUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


app.on('ready', () => {
  createWindow()

  Updater(mainWindow)

  // 每次运行APP检测更新。这里设置延时是为了避免还未开始渲染，更新检测就已经完成(网速超快，页面加载跟不上)。
  setTimeout(() => {
    // 检测是否有更新
    autoUpdater.checkForUpdates()
  }, 1500)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('gpu-process-crashed', (event) => {
  dialog.showErrorBox('gpu-process-crashed', event)
})

app.on('renderer-process-crashed', (event) => {
  dialog.showErrorBox('renderer-process-crashed', event)
})
