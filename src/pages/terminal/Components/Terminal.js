import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      commands: {
        clear: this.clearHistory.bind(this),
        ls: this.listFiles.bind(this),
        source: this.openLink('https://github.com/prakhar1989/react-term/blob/master/src/app.js'),
      },
      history: [],
      prompt: '$',
    }
  }

  componentDidMount() {
    this.terminalNode.focus()
  }

  clearHistory() {
    this.setState({ history: [] })
  }

  listFiles() {
    this.addHistory('README.md')
  }

  openLink(url) {
    return () => window.open(url, '_blank')
  }

  handleInput(e) {
    if (e.key === 'Enter') {
      const inputText = this.terminalNode.value
      const inputArray = inputText.split(' ')
      const input = inputArray[0]
      const arg = inputArray[1]
      const command = this.state.commands[input]

      this.addHistory(`${this.state.prompt} ${inputText}`)

      if (command === undefined) {
        this.addHistory(`sh: command not found: ${input}`)
      } else {
        command(arg)
      }
      this.clearInput()
    }
  }

  clearInput() {
    this.terminalNode.value = ''
  }

  addHistory(output) {
    const history = this.state.history
    history.push(output)
    this.setState({
      history,
    })
  }

  handleClick() {
    this.terminalNode.focus()
  }

  render() {
    const output = this.state.history.map((op, i) => <p key={i}>{op}</p>)
    return (
      <div
        className="input-area"
        onClick={() => this.handleClick()}
      >
        {output}
        <p>
          <span className="prompt">{this.state.prompt}</span>
          <input
            type="text"
            onKeyPress={(event) => this.handleInput(event)}
            ref={(node) => { this.terminalNode = node }}
          />
        </p>
      </div>
    )
  }
}
