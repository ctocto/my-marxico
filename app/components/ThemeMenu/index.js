/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-09-06 19:48:25
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-06 19:48:25
 */

import React, { useContext, useRef, useState } from 'react'
import Dropdown from 'rc-dropdown'
import Menu, { Item as MenuItem } from 'rc-menu'
import themeMap from '@components/ThemeMenu/theme'
import 'rc-dropdown/assets/index.css'
import { ThemeContext } from '@common/themeContext'
import styles from './style.module.less'

export default React.memo((props) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [menuSelected, setMenuSelected] = useState(theme)
  const menuItems = useRef(Array.from(themeMap).map(([key, value]) => <MenuItem key={key}>{value}</MenuItem>))
  const onSelect = ({ key }) => {
    toggleTheme(key)
    setMenuSelected(key)
  }

  return (
    <Dropdown
      key={1}
      trigger={['click']}
      overlay={(
        <Menu
          className={styles.menu}
          onSelect={onSelect}
          selectedKeys={[menuSelected]}
        >
          {menuItems.current}
        </Menu>
      )}
      animation="slide-up"
    >
      <button type="button">theme</button>
    </Dropdown>
  )
})
