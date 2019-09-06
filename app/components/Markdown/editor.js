/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 10:33:43
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-06 19:44:04
 */
import { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from '@common/themeContext'
import msngr from 'msngr'
import CodeMirror from './codemirror'

function Editor(props) {
  const { theme } = useContext(ThemeContext)
  const { value, onChange } = props

  useEffect(() => {
    msngr('markdown-set-option').emit(theme)
  }, [theme])

  return (
    <form className="editor pure-form">
      <CodeMirror
        mode="markdown"
        theme={theme}
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
