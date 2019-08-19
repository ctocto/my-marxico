const log = require('electron-log')
const util = require('util')

log.transports.console = (msg) => {
  // eslint-disable-next-line prefer-spread
  const text = util.format.apply(util, msg.data)
  // eslint-disable-next-line no-console
  console.log(`[${msg.date.toLocaleTimeString()} ${msg.level}] ${text}`)
}

module.exports = log
