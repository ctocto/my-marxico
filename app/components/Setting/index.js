/**
 * @Summary 设置
 * @Author: hefan
 * @Date: 2019-09-11 13:43:37
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-11 16:41:50
 */
import connect from 'dva'
import PropTypes from 'prop-types'
import Dialog from 'rc-dialog'
import 'rc-dialog/assets/index.css'
import { Tabs } from 'antd'
import SystemSetting from './SystemSetting'
import styles from './styles.module.less'

const { TabPane } = Tabs
const tabs = new Map([
  ['1', '常规'],
  ['2', '样式'],
  ['3', '系统'],
])
const tabsContent = new Map([
  ['1', '常规'],
  ['2', '样式'],
  ['3', <SystemSetting />],
])

function Setting(props) {
  const { visible, onClose } = props
  return (
    <Dialog
      visible={visible}
      animation="zoom"
      maskAnimation="fade"
      title="设置"
      onClose={onClose}
      className={styles.cardContainer}
    >
      <Tabs
        type="card"
        tabBarGutter={10}
      >
        {
          Array.from(tabs).map(([key, value]) => (
            <TabPane tab={value} key={key}>
              {
              tabsContent.get(key)
              }
            </TabPane>
          ))
        }
      </Tabs>
    </Dialog>
  )
}

Setting.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Setting
