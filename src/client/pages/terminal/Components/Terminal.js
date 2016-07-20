import React, { Component } from 'react'
import styles from './Terminal.css'
import KeyManager from './KeyManager'
import Client from 'client/utils/Client'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      commands: {
        clear: this.clearHistory.bind(this),
        ls: this.listFiles.bind(this),
        cat: (fileName) => this.catFile(fileName),
        source: this.openLink('https://github.com/Nord-HI/nord.is'),
      },
      history: [],
      prompt: '$ ',
    }
    this.knownKeyCombinations = [
      ['Enter', () => this.onEnterPress()],
      ['⌘+k', () => this.clearHistory()],
      ['ctrl+c', () => this.sigterm()],
    ]
  }

  componentDidMount() {
    this.inputNode.focus()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  onEnterPress() {
    const inputText = this.inputNode.value
    const inputArray = inputText.split(' ')
    const input = inputArray[0]
    const arg = inputArray[1]
    const command = this.state.commands[input]

    this.addHistory(`${this.state.prompt}${inputText}`)
    // If the command line was empty, stop
    if (inputText === '') return

    if (command === undefined) {
      this.addHistory(`sh: command not found: ${input}`)
    } else {
      command(arg)
    }
    this.clearInput()
  }

  clearHistory() {
    this.setState({ history: [] })
  }

  clearInput() {
    this.inputNode.value = ''
  }

  scrollToBottom() {
    this.terminalNode.scrollTop = this.terminalNode.scrollHeight
  }

  sigterm() {
    this.addHistory(`${this.state.prompt}${this.inputNode.value}`)
    this.clearInput()
  }

  listFiles(directory = '.') {
    Client.get(`api/loginTerminal/ls?dir=${directory}`)
      .then(res => res.json())
      .then(files => files.reduce((acc, curr, index) => {
        const deliminator = index % 3 === 0 && index !== 0 ? '\n' : '\t'
        return `${acc}${curr}${deliminator}`
      }, ''))
      .then(contents => this.addHistory(contents))
  }

  catFile(fileName) {
    Client.get(`api/loginTerminal/cat?file=${fileName}`)
      .then(res => res.text())
      .then(contents => this.addHistory(contents))
  }

  openLink(url) {
    return () => window.open(url, '_blank')
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
      <pre key={i} className={styles.output}>{op}</pre>
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
          <KeyManager
            keyCombinations={this.knownKeyCombinations}
          >
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
