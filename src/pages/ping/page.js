import React from 'react';
import styles from './style.css';
import request from 'superagent'


export default class LoginPage extends React.Component {
  componentWillMount (){
    request
      .get('/api/ping')
      .end((err, res) => {
        console.log(res);
      })
  }
  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Ping?</h1>
      </div>
    );
  }
}
