import { useContext, useRef, useState } from 'react'
import Dropdown from 'rc-dropdown'
import Menu, { Item as MenuItem } from 'rc-menu'
import themeMap from '@components/ThemeMenu/theme'
import 'rc-dropdown/assets/index.css'
import { ThemeContext } from '@common/themeContext'
import styles from './style.module.less'

export default (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [menuSelected, setMenuSelected] = useState(theme)
  const menuItems = useRef(Array.from(themeMap).map(([key, value]) => <MenuItem key={key}>{value}</MenuItem>))
  const onSelect = ({ key }) => {
    toggleTheme(key)
    setMenuSelected(key)
  }

  return (
    <Dropdown
      trigger={['click']}
      overlay={(
        <Menu
          className={styles.menu}
          onSelect={onSelect}
          activeKey={menuSelected}
        >
          {menuItems.current}
        </Menu>
      )}
    >
      <button type="button">theme</button>
    </Dropdown>
  )
}
