import React from 'react';
import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.svg';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.title}>CV Maker</span>
      </div>
    </nav>
  );
}

export default Navbar; 