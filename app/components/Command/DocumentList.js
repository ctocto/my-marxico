/**
 * @Summary 文档列表按钮
 * @Author: hefan
 * @Date: 2019-09-11 10:59:17
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-11 13:25:02
 */
import { connect } from 'dva'
import PropTypes from 'prop-types'


function DocumentList(props) {
  const { dispatch } = props
  const handleSvae = () => {
    dispatch({
      type: 'app/toggleDrawer',
      payload: {
        documentListDrawer: true,
      },
    })
  }

  return (
    <button type="button" onClick={handleSvae}>documents</button>
  )
}

DocumentList.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(DocumentList)
