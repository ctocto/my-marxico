/**
 * @Summary 新建文档
 * @Author: hefan
 * @Date: 2019-09-09 21:55:24
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-18 16:11:31
 */
import { connect } from 'dva'
import PropTypes from 'prop-types'

function CreateNewFile(props) {
  const handleCreate = () => {
    // props.dispatch({
    //   type: 'file/newFile',
    // })
    props.dispatch({
      type: 'documents/fetchAddDoc',
    })
  }
  // ipcRenderer.on('operating-file-success', (...data) => {
  //   console.log(data)
  // })
  // ipcRenderer.on('operating-file-error', (err) => {
  //   console.log(err)
  // })
  return (
    <button type="button" onClick={handleCreate}>new</button>
  )
}

CreateNewFile.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(CreateNewFile)
