import React from 'react'
// import styles from './LoginForm.css';
import Client from '../../../util/Client'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  onUsernameChange(event) {
    this.setState({ username: event.target.value })
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    Client.post('api/login', {
      name: this.state.username,
      password: this.state.password,
    })
    .then(res => res.json())
    .catch(err => console.error(err))
  }
  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input
          type="text"
          autoComplete="username"
          value={this.state.username}
          onChange={event => this.onUsernameChange(event)}
        />
        <input
          type="password"
          autoComplete="password"
          value={this.state.password}
          onChange={event => this.onPasswordChange(event)}
        />
        <input type="submit" />
      </form>
    )
  }
}
