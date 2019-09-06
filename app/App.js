import PropTypes from 'prop-types'

import { Router, Route, Switch } from 'dva/router'
import { getRouterData, getRoutes } from '@common/router'
import ThemeProvider from '@components/ThemeProvider'
import '@common/theme.less'

import './index.css'

function App({ history, app }) {
  const routerData = getRoutes('', getRouterData(app))

  return (
    <ThemeProvider>
      <Router history={history}>
        <Switch>
          {
            routerData.map(({ key, path, component }) => (
              <Route key={key} path={path} exact component={component} />
            ))
          }
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  app: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default App
