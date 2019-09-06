/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 11:00:06
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-06 19:41:41
 */
import {
  useRef, useEffect, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import msngr from 'msngr'
// eslint-disable-next-line import/no-unresolved
import CodeMirror from 'CodeMirror'


let editor = null

function CodeMirrorEditor(props) {
  const {
    value, readOnly, defaultValue, onChange, textAreaClassName, forceTextArea,
  } = props
  const editorEl = useRef(null)

  const handleChange = useCallback(() => {
    if (!editor) {
      return
    }
    const editorValue = editor.getValue()

    if (editorValue === value) {
      return
    }

    if (onChange) {
      onChange({ target: { value: editorValue } })
    }
  }, [onChange, value])

  useEffect(() => {
    const isTextArea = forceTextArea
    if (!isTextArea) {
      editor = CodeMirror.fromTextArea(editorEl.current, props)
      editor.on('change', handleChange)
      msngr('window-reseze').on(() => {
        // console.log('window-reseze')
        editor.refresh()
      })

      msngr('markdown-set-option').on((theme) => {
        editor.setOption('theme', theme)
      })
    }
  }, [forceTextArea, handleChange, props])

  useEffect(() => {
    if (!editor) {
      return
    }
    // console.log(456, editor.getValue(), value, editor)
    if (value && editor.getValue() !== value) {
      editor.setValue(value)
    }
  }, [value])

  return (
    <div style={{ height: '100%' }}>
      <textarea
        ref={editorEl}
        value={value}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onChange={onChange}
        className={textAreaClassName}
      />
    </div>
  )
}

CodeMirrorEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.string,
  textAreaClassName: PropTypes.string,
  onChange: PropTypes.func,
  forceTextArea: PropTypes.bool,
  value: PropTypes.string,
}

export default CodeMirrorEditor
