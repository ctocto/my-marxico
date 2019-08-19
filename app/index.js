import dva from 'dva'

const createHistory = require('history').createHashHistory


const app = dva({
  history: createHistory(),
})


// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default)

// 4. Router
app.router(require('./App').default)

// 5. Start
app.start('#root')
