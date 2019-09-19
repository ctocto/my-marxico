/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-08-19 18:48:19
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-11 13:24:34
 */
import React from 'react'
import msngr from 'msngr'
import ThemeMenu from '@components/ThemeMenu'
import CreateNewFile from './CreateNewFile'
import SaveFile from './SaveFile'
import styles from './style.module.less'
import UserSetting from './UserSetting'
import DocumentList from './DocumentList'


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
      <ul className={styles.Command__btnGroups}>
        <li>
          <DocumentList />
        </li>
        <li>
          <ThemeMenu />
        </li>
        <li>
          <button type="button" onClick={handleFullScreen}>full</button>
        </li>
      </ul>
      <ul className={styles.Command__btnGroups}>
        <li>
          <SaveFile />
        </li>
        <li>
          <CreateNewFile />
        </li>
        <li>
          <UserSetting />
        </li>
      </ul>
    </nav>
  )
}

export default React.memo(Command)
