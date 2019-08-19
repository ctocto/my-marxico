/**
 * @Summary short description for the file
 * @Author: ctocto
 * @Date: 2019-08-19 13:34:26
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-08-19 19:14:12
 */

import ReactMarkdown from 'react-markdown/with-html'
import { useState } from 'react'
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

function Markdown() {
  const [markdownSrc, setMarkdownSrc] = useState(initialSource)
  const [htmlMode] = useState('raw')

  const handleMarkdownChange = (evt) => {
    setMarkdownSrc(evt.target.value)
  }

  // const handleControlsChange = (mode) => {
  //   setHtmlMode(mode)
  // }

  return (
    <div className={styles.Markdown}>
      <div className={`editor-pane ${styles.Markdown__editorPane}`}>
        {/* <MarkdownControls onChange={this.handleControlsChange} mode={this.state.htmlMode} /> */}

        <Editor value={markdownSrc} onChange={handleMarkdownChange} />
      </div>

      <div className={`result-pane ${styles.Markdown__resultPane}`}>
        <ReactMarkdown
          className="result"
          source={markdownSrc}
          skipHtml={htmlMode === 'skip'}
          escapeHtml={htmlMode === 'escape'}
          renderers={{ code: CodeBlock }}
        />
      </div>
    </div>
  )
}

export default Markdown
