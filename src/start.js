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

  // eslint-disable-next-line global-require
  require('./controller/file/subscribe')

  // 打开开发者工具
  mainWindow.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  mainWindow.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素
    mainWindow = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用
app.on('ready', () => {
  createWindow()

  Updater(mainWindow)

  // 每次运行APP检测更新。这里设置延时是为了避免还未开始渲染，更新检测就已经完成(网速超快，页面加载跟不上)。
  setTimeout(() => {
    // 检测是否有更新
    autoUpdater.checkForUpdates()
  }, 1500)
})

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
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
