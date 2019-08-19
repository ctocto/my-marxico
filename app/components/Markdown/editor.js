/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 10:33:43
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-08-19 15:24:14
 */
import PropTypes from 'prop-types'
import CodeMirror from './codemirror'

function Editor(props) {
  const { value, onChange } = props

  return (
    <form className="editor pure-form">
      <CodeMirror
        mode="markdown"
        theme="monokai"
        lineWrapping
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

Editor.defaultProps = {
  value: '',
}

export default Editor
