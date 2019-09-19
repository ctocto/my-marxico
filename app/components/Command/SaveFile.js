import { connect } from 'dva'
import PropTypes from 'prop-types'


function SaveFile(props) {
  const { currentFileData, dispatch } = props
  const handleSvae = () => {
    dispatch({
      type: 'file/saveFile',
    })
  }

  return (
    <button type="button" onClick={handleSvae}>save</button>
  )
}

SaveFile.propTypes = {
  currentFileData: PropTypes.string,
  dispatch: PropTypes.func,
}

export default connect(({ file }) => ({
  currentFileData: file.currentFileData,
}))(SaveFile)
