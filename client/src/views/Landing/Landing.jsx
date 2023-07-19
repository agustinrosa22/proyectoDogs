import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <body  className={styles.container}>

    <div>
      <Link className={styles.button} to="/home">INGRESAR</Link>
    </div>
    </body>
  );
}

export default Landing;