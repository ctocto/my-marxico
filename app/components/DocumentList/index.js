/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/accessible-emoji */
/**
 * @Summary 文档列表
 * @Author: hefan
 * @Date: 2019-09-11 11:16:43
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-19 11:04:41
 */
import { connect } from 'dva'
import PropTypes from 'prop-types'

import Drawer from 'rc-drawer'
import Menu, { Item as MenuItem, ItemGroup as MenuItemGroup } from 'rc-menu'
import 'rc-drawer/assets/index.css'
import 'rc-menu/assets/index.css'
import { useEffect } from 'react'

function DocumentList(props) {
  const {
    documentListDrawer, dispatch, list, currentDocId,
  } = props

  useEffect(() => {
    dispatch({
      type: 'documents/fetchList',
    })
  }, [dispatch])

  const handleCloseDrawer = (payload) => {
    dispatch({
      type: 'app/toggleDrawer',
      payload,
    })
  }

  const handleClickMenu = ({ key }) => {
    dispatch({
      type: 'documents/fetchDoc',
      payload: key,
    })
  }

  const handleDelDoc = (id) => {
    dispatch({
      type: 'documents/fetchDelDoc',
      payload: id,
    })
  }

  return (
    <Drawer
      width="320px"
      handler={false}
      open={documentListDrawer}
      onClose={() => { handleCloseDrawer({ documentListDrawer: false }) }}
      className="drawer1"
      placement="left"
    >
      <Menu
        onClick={handleClickMenu}
        selectedKeys={[currentDocId]}
      >
        {
          list.map(item => (
            <MenuItem
              key={item._id}
              itemIcon={() => (
                <>
                  <span>✔️</span>
                  <button type="button" onClick={() => { handleDelDoc(item._id) }}>✖️</button>
                </>
              )}
            >
              {item.title}

            </MenuItem>
          ))
        }
        <MenuItemGroup key="g2" title="归档">
          <MenuItem key="6">我的第一个笔记本</MenuItem>
        </MenuItemGroup>
      </Menu>
    </Drawer>
  )
}

DocumentList.propTypes = {
  documentListDrawer: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.array).isRequired,
  currentDocId: PropTypes.string.isRequired,
}

export default connect(({ app, documents }) => ({
  documentListDrawer: app.documentListDrawer,
  list: documents.documents,
  currentDocId: documents.currentDocId,
}))(DocumentList)
