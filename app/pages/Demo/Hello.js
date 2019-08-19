import { PureComponent } from 'react'

export default class Hello extends PureComponent {
  state = {
    content: 'This is class component',
  }

  render() {
    const { content } = this.state
    return (
      <div>{content}</div>
    )
  }
}
