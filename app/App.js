import PropTypes from 'prop-types'

import { Router, Route, Switch } from 'dva/router'
import { getRouterData, getRoutes } from '@common/router'

import './index.css'

function App({ history, app }) {
  const routerData = getRoutes('', getRouterData(app))

  return (
    <Router history={history}>
      <Switch>
        {
          routerData.map(({ key, path, component }) => (
            <Route key={key} path={path} exact component={component} />
          ))
        }
      </Switch>
    </Router>
  )
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  app: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default App
