import React from 'react';
import styles from './style.css';
import fetch from 'isomorphic-fetch';

export default class LoginPage extends React.Component {
  componentWillMount() {
    fetch('/api/ping')
    .then(response => response.text())
    .then(responseText => {
      console.log(responseText);
    });
  }
  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Ping?</h1>
      </div>
    );
  }
}
