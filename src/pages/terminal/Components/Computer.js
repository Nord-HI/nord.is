import React from 'react'
import styles from './Computer.css'
// import Terminal from './Terminal'

export default function Computer() {
  return (
    <div className={styles.root}>
      <div className={styles.computerContainer}>
        <div className={styles.computerFront}>
          <div className={styles.screenContainer}>
            <div className={styles.screen}></div>
          </div>
        </div>
        <div className={styles.bottomDecorContainer}>
          <div className={styles.bottomDecor}></div>
        </div>
      </div>
    </div>
  )
}
