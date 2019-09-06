/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-08-19 18:48:19
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-06 19:17:35
 */
import React from 'react'
import msngr from 'msngr'
import ThemeMenu from '@components/ThemeMenu'
import styles from './style.module.less'


function Command() {
  const handleFullScreen = () => {
    document.getElementById('root').classList.toggle('fullScreen')
    // 有一个窗口动画时间
    setTimeout(() => {
      msngr('window-reseze').emit()
    }, 300)
  }

  return (
    <nav className={styles.Command}>
      <ul>
        <li>
          <button type="button">home</button>
        </li>
        <li>
          {/* <button type="button" onClick={handleSwitchTheme}>theme</button> */}
          <ThemeMenu />
        </li>
        <li>
          <button type="button" onClick={handleFullScreen}>full</button>
        </li>
      </ul>
    </nav>
  )
}

export default React.memo(Command)
