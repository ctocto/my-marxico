import { useEffect } from 'react'
import { Link } from 'dva/router'

import Markdown from '@components/Markdown'
import Command from '@components/Command'

import { ipcRenderer } from 'electron'
import styles from './style.module.less'

// const { ipcRenderer } = window.require('electron')
export default function Home() {
  useEffect(() => {
    ipcRenderer.on('checking-for-update', (event, message) => {
      console.log(message)
    })
    ipcRenderer.on('autoUpdater-error', (event, err) => {
      console.log(err)
      const myNotification = new Notification('提示', {
        body: '更新失败',
      })
    })
    ipcRenderer.on('autoUpdater-canUpdate', (event, info) => {
      console.log(info)
      const myNotification = new Notification('提示', {
        body: '有新版本可选择更新',
      })
      myNotification.onclick = () => {
        console.log('通知被点击')
      }
    })
  }, [])

  return (
    <div className={styles.App}>
      <Command />
      <Markdown />
      {/* <header className={styles.AppHeader}>

        <Link to="/demo/counter">to counter</Link>
      </header> */}
    </div>
  )
}
