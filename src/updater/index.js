const { autoUpdater } = require('electron-updater')

function Updater(mainWindow) {
  // 发送消息给渲染线程
  function sendStatusToWindow(status, params) {
    mainWindow.webContents.send(status, params)
    global.log.info(status, params)
  }
  autoUpdater.autoDownload = false // 关闭自动更新
  autoUpdater.autoInstallOnAppQuit = true // APP退出的时候自动安装
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('autoUpdater-checking', 'Checking for update...')
  })
  autoUpdater.on('update-available', (info) => {
    // 可以更新版本
    sendStatusToWindow('autoUpdater-canUpdate', info)
  })
  autoUpdater.on('update-not-available', (info) => {
    // 不能够更新
    global.log.info('autoUpdater-not-available', info)
  })
  autoUpdater.on('error', (err) => {
    // 更新错误
    sendStatusToWindow('autoUpdater-error', err)
  })
  autoUpdater.on('download-progress', (progressObj) => {
    // 正在下载的下载进度
    // sendStatusToWindow('autoUpdater-progress', progressObj)
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`
    sendStatusToWindow(logMessage)
  })
  autoUpdater.on('update-downloaded', (info) => {
    // 下载完成
    sendStatusToWindow('autoUpdater-downloaded')
  })
}

module.exports = {
  autoUpdater,
  Updater,
}
