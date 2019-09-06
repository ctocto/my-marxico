/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-09-06 19:48:05
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-06 19:48:05
 */

// https://zhuanlan.zhihu.com/p/50336226
import { useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext, themes, defaultTheme } from '@common/themeContext'

const initialTheme = () => localStorage.getItem('theme') || defaultTheme

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme)

  const toggleTheme = (themeValue) => {
    const value = themes.get(themeValue)
    localStorage.setItem('theme', value)
    setTheme(value)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
