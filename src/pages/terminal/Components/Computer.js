import React from 'react'
import styles from './Computer.css'
import Terminal from './Terminal'
import appleLogo from '../../../assets/static/images/apple-logo.png'

export default function Computer() {
  return (
    <div className={styles.root}>
      <main className={styles.computerContainer}>
        <div className={styles.screenContainer}>
          <div className={styles.screenFrame}>
            <div className={styles.screen}>
              <Terminal />
            </div>
          </div>
        </div>
        <div className={styles.bodyDecor}>
          <div className={styles.floppyDriveContainer}>
            <div className={styles.floppyDrive}>
              <div className={styles.floppyShade}></div>
              <div className={styles.floppyShadeDarker}></div>
              <div className={styles.floppySlot}></div>
            </div>
          </div>
          <div className={styles.logoContainer}>
            <div
              className={styles.logo}
              style={{ backgroundImage: `url(${appleLogo})` }}
              alt="apple logo"
            ></div>
          </div>
        </div>
        <div className={styles.bottomDecor}>
          <div className={styles.bottomButton}></div>
        </div>
      </main>
    </div>
  )
}
