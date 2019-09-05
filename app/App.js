import { useState } from 'react'
import PropTypes from 'prop-types'

import { Router, Route, Switch } from 'dva/router'
import { getRouterData, getRoutes } from '@common/router'
import { ThemeContext, themes, defaultTheme } from '@common/themeContext'
import '@common/theme.less'

import './index.css'

const initialTheme = () => localStorage.getItem('theme') || defaultTheme

function App({ history, app }) {
  const [theme, setTheme] = useState(initialTheme)
  const routerData = getRoutes('', getRouterData(app))

  const toggleTheme = (themeValue) => {
    const value = themes.get(themeValue)
    localStorage.setItem('theme', value)
    setTheme(value)
  }

  return (
    <div className={`theme-${theme}`}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router history={history}>
          <Switch>
            {
              routerData.map(({ key, path, component }) => (
                <Route key={key} path={path} exact component={component} />
              ))
            }
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </div>
  )
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  app: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default App
