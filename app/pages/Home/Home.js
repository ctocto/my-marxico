import { useEffect } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'

import Markdown from '@components/Markdown'
import Command from '@components/Command'
import PageLayout from '@components/PageLayout'

import { ipcRenderer } from 'electron'
import styles from './style.module.less'

// const { ipcRenderer } = window.require('electron')
function Home(props) {
  const { dispatch } = props
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

  useEffect(() => {
    dispatch({
      type: 'setting/fetchData',
    })
  }, [dispatch])

  return (
    <PageLayout>
      <Command />
      <Markdown />
    </PageLayout>
  )
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Home)
