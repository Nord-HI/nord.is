import React, { Component } from 'react'
import styles from './Terminal.css'
import KeyManager from './KeyManager'
import Client from 'client/utils/Client'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      commands: {
        clear: this.clearHistory.bind(this),
        ls: this.listFiles.bind(this),
        cat: (fileName) => this.catFile(fileName),
        source: this.openLink('https://github.com/Nord-HI/nord.is'),
        help: this.help.bind(this),
        hjalp: this.hjalp.bind(this),
        login: this.login.bind(this),
      },
      history: [],
      prompt: '$ ',
    }
    this.knownKeyCombinations = [
      ['Enter', () => this.onEnterPress()],
      ['ctrl+k', () => this.clearHistory()],
      ['ctrl+c', () => this.sigterm()],
    ]
  }

  componentDidMount() {
    this.inputNode.focus()
    this.help()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  onEnterPress() {
    if (this.state.history[this.state.history.length - 1] === '$ login') {
      this.getUsername()
      return
    }
    if (this.state.history[this.state.history.length - 2] === '$ login') {
      this.getPassAndLogin()
      return
    }
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

  getUsername() {
    const username = this.inputNode.value
    this.setState({ username })
    this.addHistory(`${this.state.prompt}${username}`)
    this.clearInput()
    this.setState({ prompt: 'password: ' })
    this.inputNode.type = 'password'
  }


  getPassAndLogin() {
    const password = this.inputNode.value
    this.addHistory(`${this.state.prompt}${password}`)
    this.clearInput()
    this.setState({ prompt: '$ ' })
    Client.post('api/login', { username: this.state.username, password })
      // TODO catch errors
      .then(() => this.setState({ prompt: `[${this.state.username}] ` }))
      .then(() => { document.location.href = '/' })
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

  help() {
    Client.get('api/loginTerminal/cat?file=help.txt')
      .then(res => res.text())
      .then(contents => this.addHistory(contents))
  }

  hjalp() {
    Client.get('api/loginTerminal/cat?file=hjalp.txt')
      .then(res => res.text())
      .then(contents => this.addHistory(contents))
  }

  login() {
    this.setState({ prompt: 'user: ' })
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
            className={styles.inputContainer}
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
