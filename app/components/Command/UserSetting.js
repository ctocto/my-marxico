/**
 * @Summary 账户设置按钮
 * @Author: hefan
 * @Date: 2019-09-11 10:59:17
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-11 13:36:45
 */
import { connect } from 'dva'
import PropTypes from 'prop-types'


function UserSetting(props) {
  const { dispatch } = props
  const handleSvae = () => {
    dispatch({
      type: 'app/toggleDrawer',
      payload: {
        settingDrawer: true,
      },
    })
  }

  return (
    <button type="button" onClick={handleSvae}>user</button>
  )
}

UserSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(UserSetting)
