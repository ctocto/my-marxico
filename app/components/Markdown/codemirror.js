/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 11:00:06
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-18 19:50:23
 */
import React from 'react'
import PropTypes from 'prop-types'
import msngr from 'msngr'
// eslint-disable-next-line import/no-unresolved
import CodeMirror from 'CodeMirror'

export default class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isControlled: Boolean(this.props.value) }
    this.handleChange = this.handleChange.bind(this)
    this.editorRef = React.createRef()
  }

  componentDidMount() {
    const isTextArea = !!this.props.forceTextArea
    if (!isTextArea) {
      this.editor = CodeMirror.fromTextArea(this.editorRef.current, this.props)
      this.editor.on('change', this.handleChange)

      this.handleMsg()
    }
  }

  handleMsg() {
    msngr('window-reseze').on(() => {
      // console.log('window-reseze')
      this.editor.refresh()
    })

    msngr('markdown-set-option').on((theme) => {
      this.editor.setOption('theme', theme)
    })

    msngr('markdown-set-option').on((theme) => {
      this.editor.setOption('theme', theme)
    })
  }

  componentDidUpdate() {
    if (!this.editor) {
      return
    }

    if (this.props.value) {
      if (this.editor.getValue() !== this.props.value) {
        this.editor.setValue(this.props.value)
      }
    } else {
      this.editor.setValue('')
    }
  }

  handleChange() {
    if (!this.editor) {
      return
    }

    const value = this.editor.getValue()
    if (value === this.props.value) {
      return
    }

    if (this.props.onChange) {
      this.props.onChange({ target: { value } })
    }

    if (this.editor.getValue() !== this.props.value) {
      if (this.state.isControlled) {
        this.editor.setValue(this.props.value)
      } else {
        this.props.value = value
      }
    }
  }

  render() {
    const editor = React.createElement('textarea', {
      ref: this.editorRef,
      value: this.props.value,
      readOnly: this.props.readOnly,
      defaultValue: this.props.defaultValue,
      onChange: this.props.onChange,
      className: this.props.textAreaClassName,
    })

    return React.createElement('div', {
      style: {
        height: '100%',
      },
    }, editor)
  }
}

CodeMirrorEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.string,
  textAreaClassName: PropTypes.string,
  onChange: PropTypes.func,
  forceTextArea: PropTypes.bool,
  value: PropTypes.string,
}
