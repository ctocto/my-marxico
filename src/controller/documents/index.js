/**
 * @Summary 文档管理
 * @Author: hefan
 * @Date: 2019-09-17 19:38:36
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-19 11:00:50
 */

const context = require('../context')

const db = context.getDataBase('document')

exports.getDocList = () => new Promise((resolve, reject) => {
  db.find({}).projection({ title: 1, tag: 1, category: 1 }).sort({ _id: -1 }).exec((err, docs) => {
    if (!err) {
      resolve(docs)
    }
    reject(err)
  })
})

exports.addDoc = doc => new Promise((resolve, reject) => {
  db.insert(doc, (err, newDoc) => {
    if (!err) {
      resolve(newDoc)
    }

    reject(err)
  })
})

exports.getDoc = id => new Promise((resolve, reject) => {
  db.findOne({ _id: id }, (err, doc) => {
    if (!err) {
      resolve(doc)
    }

    reject(err)
  })
})

exports.delDoc = id => new Promise((resolve, reject) => {
  db.remove({ _id: id }, {}, (err, numRemoved) => {
    if (!err) {
      resolve(numRemoved)
    }

    reject(err)
  })
})

exports.updateDoc = ({ id, ...doc }) => new Promise((resolve, reject) => {
  global.log.info(doc)

  if (id) {
    db.update({ _id: id }, { ...doc }, {}, (err, numReplaced) => {
      if (!err) {
        resolve(numReplaced)
      }

      reject(err)
    })
  } else {
    db.insert(doc, (err, newDoc) => {
      if (!err) {
        resolve(newDoc)
      }

      reject(err)
    })
  }
})
