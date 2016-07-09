import React from 'react';
import styles from './style.css';
import LoginForm from './components/LoginForm';

export default function HomePage() {
  return (
    <div className={styles.content}>
      <h1>Nörd.is</h1>
      <h2>Vefsíða félags tölvunarfræði og hugbúnaðarverkfræðinema</h2>
      <LoginForm />
    </div>
  );
}
