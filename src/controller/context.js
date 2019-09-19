const Nedb = require('nedb')
const { app } = require('electron')
const path = require('path')

const USERDATA_PATH = app.getPath('userData')

class Context {
  dataBase = new Map()

  addDb(name) {
    const db = new Nedb({
      filename: path.join(USERDATA_PATH, `${name}.db`),
      autoload: true,
    })

    this.dataBase.set(name, db)
  }

  getDataBase(name) {
    if (!this.dataBase.has(name)) {
      this.addDb(name)
    }
    return this.dataBase.get(name)
  }
}

module.exports = new Context()
