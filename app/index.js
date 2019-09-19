import dva from 'dva'
import createLogger from 'dva-logger'

const createHistory = require('history').createHashHistory


const app = dva({
  history: createHistory(),
})


// 2. Plugins
app.use(createLogger())

// 3. Model
app.model(require('./models/app').default)

// 4. Router
app.router(require('./App').default)

// 5. Start
app.start('#root')
