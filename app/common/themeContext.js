import React from 'react'

export themes from '@components/ThemeMenu/theme'

export const defaultTheme = 'monokai' // 默认值

export const ThemeContext = React.createContext({
  theme: defaultTheme,
  toggleTheme: () => {},
})
