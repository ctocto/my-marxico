/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 11:00:06
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-08-19 16:35:20
 */
import {
  useState, useRef, useEffect, useCallback,
} from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-unresolved
import CodeMirror from 'CodeMirror'

const IS_MOBILE = typeof navigator === 'undefined' || (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
)

let editor = null

function CodeMirrorEditor(props) {
  const {
    value, readOnly, defaultValue, onChange, textAreaClassName, forceTextArea,
  } = props
  const editorEl = useRef(null)
  // const [isControlled] = useState(Boolean(value))

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
    // console.log(4567, editor.getValue() !== value, isControlled, value)
    // if (editor.getValue() !== value) {
    //   if (isControlled) {
    //     editor.setValue(value)
    //   } else {
    //     props.value = value
    //   }
    // }
  }, [value])


  useEffect(() => {
    const isTextArea = forceTextArea || IS_MOBILE
    if (!isTextArea) {
      editor = CodeMirror.fromTextArea(editorEl.current, props)
      editor.on('change', handleChange)
    }
  }, [forceTextArea])

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
