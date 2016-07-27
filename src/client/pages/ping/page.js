import React from 'react'
import styles from './style.css'
import fetch from 'isomorphic-fetch'

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { serverStatus: '' }
  }

  componentWillMount() {
    fetch('/api/ping')
    .then(response => response.text())
    .then(responseText => this.setState({ serverStatus: responseText }))
    .catch(_ => this.setState({ serverStatus: 'Server is down' }))
  }
  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Ping?</h1>
        {this.state.serverStatus &&
          <p>{this.state.serverStatus}</p>
        }
      </div>
    )
  }
}
