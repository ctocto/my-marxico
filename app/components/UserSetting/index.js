/**
 * @Summary 账户设置
 * @Author: hefan
 * @Date: 2019-09-11 11:16:43
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-11 15:12:26
 */
import { connect } from 'dva'
import PropTypes from 'prop-types'

import Menu, { Item as MenuItem, ItemGroup as MenuItemGroup } from 'rc-menu'
import Drawer from 'rc-drawer'
import Setting from '@components/Setting'
import 'rc-drawer/assets/index.css'
import 'rc-menu/assets/index.css'


function UserSetting(props) {
  const { settingDrawer, settingVisible, dispatch } = props

  const handleCloseDrawer = (payload) => {
    dispatch({
      type: 'app/toggleDrawer',
      payload,
    })
  }

  const handleSetting = () => {
    dispatch({ type: 'setting/toggleSettingVisible' })
  }

  const handleClickMenu = ({ key }) => {
    switch (key) {
      case '6':
        handleCloseDrawer({ settingDrawer: false })
        handleSetting()
        break

      default:
        break
    }
  }

  return (
    <>
      <Drawer
        width="320px"
        handler={false}
        open={settingDrawer}
        onClose={() => { handleCloseDrawer({ settingDrawer: false }) }}
        className="drawer2"
        placement="right"
      >
        <Menu onClick={handleClickMenu}>
          <MenuItem key="1">hefan</MenuItem>
          <MenuItem key="2">退出账号</MenuItem>
          <MenuItemGroup key="g1" title="当前文档">
            <MenuItem key="3">删除文档</MenuItem>
            <MenuItem key="4">预览文档</MenuItem>
            <MenuItem key="5">导出文档</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="系统">
            <MenuItem key="6">设置</MenuItem>
            <MenuItem key="7">使用说明</MenuItem>
            <MenuItem key="8">快捷帮助</MenuItem>
            <MenuItem key="9">关于</MenuItem>
          </MenuItemGroup>
        </Menu>
      </Drawer>
      <Setting
        visible={settingVisible}
        onClose={handleSetting}
      />
    </>

  )
}

UserSetting.propTypes = {
  settingDrawer: PropTypes.bool.isRequired,
  settingVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ app, setting }) => ({
  settingDrawer: app.settingDrawer,
  settingVisible: setting.settingVisible,
}))(UserSetting)
