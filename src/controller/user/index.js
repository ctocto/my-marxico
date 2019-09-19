/**
 * @Summary 用户
 * @Author: hefan
 * @Date: 2019-09-17 10:06:00
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-17 19:21:53
 */
const { app } = require('electron')
const fs = require('fs')
const path = require('path')
const context = require('../context')

const db = context.getDataBase('user')

const docDir = app.getPath('documents')

const docPath = path.join(docDir, 'my_marxico_documents')

if (!fs.existsSync(docPath)) {
  fs.mkdir(docPath, (err) => {
    if (err) throw err
  })
}

const doc = {
  _id: 0,
  documentPath: docPath,
  theme: 'monokai',
}

function init() {
  db.find({}, (err, docs) => {
    global.log.info(err, docs, 456)
    if (!docs || !docs.length) {
      db.insert(doc, (err, newDoc) => {
        if (err) {
          global.log.error(err)
        }
      })
    }
  })
}

init()

exports.getDefaultUserSetting = () => doc

exports.getUserSetting = () => new Promise((resolve, reject) => {
  db.findOne({ _id: 0 }, (err, docs) => {
    if (!err) {
      resolve(docs)
    }

    reject(err)
  })
})

exports.updateUserSetting = update => new Promise((resolve, reject) => {
  db.update({ _id: 0 }, { ...update }, {}, (err, numReplaced) => {
    if (!err) {
      resolve(numReplaced)
    }

    reject(err)
  })
})
