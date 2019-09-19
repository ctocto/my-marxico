/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 13:34:26
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-18 19:56:39
 */
import ReactMarkdown from 'react-markdown/with-html'
import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '@common/themeContext'
import msngr from 'msngr'
import { connect } from 'dva'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-unresolved
import CodeMirror from 'CodeMirror'
import styles from './style.module.less'
import Editor from './editor'
import CodeBlock from './code-block'

const initialSource = `
# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`

function Markdown(props) {
  const [markdownSrc, setMarkdownSrc] = useState(initialSource)
  const [htmlMode] = useState('raw')
  const { theme } = useContext(ThemeContext)
  const { currentDocData, dispatch, currentDocId } = props

  const handleMarkdownChange = (evt) => {
    // setMarkdownSrc(evt.target.value)
    dispatch({
      type: 'documents/saveData',
      payload: evt.target.value,
    })
  }

  useEffect(() => {
    CodeMirror.commands.save = () => {
      dispatch({
        type: 'documents/fetchUpdateDoc',
        payload: {
          id: currentDocId,
          content: currentDocData,
        },
      })
    }
  }, [currentDocData, currentDocId, dispatch])


  useEffect(() => {
    msngr('markdown-change-value').on((value) => {
      setMarkdownSrc(value)
    })
  }, [])

  // const handleControlsChange = (mode) => {
  //   setHtmlMode(mode)
  // }

  return (
    <div className={styles.Markdown}>
      <div className={`${styles.Markdown__editorPane} markwon-edit-pane theme__${theme}`}>
        <div className="editor-pane">
          {/* <MarkdownControls onChange={this.handleControlsChange} mode={this.state.htmlMode} /> */}

          <Editor value={currentDocData} onChange={handleMarkdownChange} />
        </div>
      </div>
      <div className={`${styles.Markdown__resultPane} markwon-result-pane`}>
        <div className="result-pane">
          <ReactMarkdown
            className="result"
            source={currentDocData}
            skipHtml={htmlMode === 'skip'}
            escapeHtml={htmlMode === 'escape'}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
    </div>
  )
}

Markdown.propTypes = {
  currentDocData: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentDocId: PropTypes.string.isRequired,
}

export default connect(({ documents }) => ({
  currentDocData: documents.currentDocData,
  currentDocId: documents.currentDocId,
}))(Markdown)
