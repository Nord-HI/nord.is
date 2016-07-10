import React from 'react'
import Computer from './Components/Computer'
import styles from './page.css'

export default function TerminalPage() {
  return (
    <div className={styles.page}>
      <div id="container">
        <Computer />
      </div>
    </div>
  )
}
