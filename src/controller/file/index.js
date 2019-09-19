const fs = require('fs')

exports.readFile = (path, event) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) event.reply('operating-file-error', err)
    event.reply('operating-file-success', data)
  })
}

exports.writeFile = (file, data, event) => {
  fs.writeFile(file, data, 'utf8', (err) => {
    if (err) event.reply('operating-file-error', err)
    event.reply('operating-file-success', 'success')
  })
}
