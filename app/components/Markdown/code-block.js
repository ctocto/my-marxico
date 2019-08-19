/**
 * @Summary code block
 * @Author: ctocto
 * @Date: 2019-08-19 10:50:11
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-08-19 14:24:47
 */

import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-unresolved
import hljs from 'hljs'

function CodeBlock(props) {
  const { value, language } = props
  const codeEl = useRef(null)

  function highlightCode() {
    hljs.highlightBlock(codeEl.current)
  }

  useEffect(() => {
    highlightCode()
  })

  return (
    <pre>
      <code ref={codeEl} className={`language-${language}`}>
        {value}
      </code>
    </pre>
  )
}

CodeBlock.defaultProps = {
  language: '',
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
}

export default CodeBlock
