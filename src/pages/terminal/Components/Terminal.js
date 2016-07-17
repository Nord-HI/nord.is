import React, { Component } from 'react'
import styles from './Terminal.css'
import KeyManager from './KeyManager'

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
      prompt: '$ ',
    }
  }

  componentDidMount() {
    this.inputNode.focus()
    KeyManager.add('x', () => this.sigterm())
    KeyManager.add('Enter', () => this.onEnterPress())
    KeyManager.add('⌘+k', () => this.clearHistory())
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentWillUnmount() {
  }

  clearHistory() {
    this.setState({ history: [] })
  }

  scrollToBottom() {
    this.terminalNode.scrollTop = this.terminalNode.scrollHeight
  }

  sigterm() {
    console.log('sigterm')
  }

  listFiles() {
    this.addHistory('README.md')
  }

  openLink(url) {
    return () => window.open(url, '_blank')
  }

  onEnterPress() {
    const inputText = this.inputNode.value
    const inputArray = inputText.split(' ')
    const input = inputArray[0]
    const arg = inputArray[1]
    const command = this.state.commands[input]

    this.addHistory(`${this.state.prompt}${inputText}`)

    if (command === undefined) {
      this.addHistory(`sh: command not found: ${input}`)
    } else {
      command(arg)
    }
    this.clearInput()
  }

  clearInput() {
    this.inputNode.value = ''
  }

  addHistory(output) {
    const history = this.state.history
    history.push(output)
    this.setState({
      history,
    })
  }

  handleClick() {
    this.inputNode.focus()
  }

  render() {
    const output = this.state.history.map((op, i) => (
      <p key={i} className={styles.output}>{op}</p>
    ))
    return (
      <div
        className={styles.inputArea}
        ref={(node) => { this.terminalNode = node }}
        onClick={() => this.handleClick()}
      >
        {output}
        <p className={styles.currentLine}>
          <span className={styles.prompt}>{this.state.prompt}</span>
          <KeyManager>
            <input
              className={styles.input}
              type="text"
              ref={(node) => { this.inputNode = node }}
            />
          </KeyManager>
        </p>
      </div>
    )
  }
}
