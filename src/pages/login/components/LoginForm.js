import React from 'react';
// import styles from './LoginForm.css';
import fetch from 'isomorphic-fetch';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('api/login', { method: 'POST' })
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
    );
  }
}
