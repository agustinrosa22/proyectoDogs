import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    

    <div className={styles.container}>
      <div className={styles.container2}>
      <h1 className={styles.text}>WELCOME!!!</h1>
      <p className={styles.text}>On this page you can find and create the dog breeds that you like the most and learn information about them</p>
      <Link className={styles.button} to="/home">INGRESAR</Link>
      <h1></h1>
      <img  className={styles.img} src="https://assets.soyhenry.com/logoOG.png" alt="" />
      </div>
    </div>
    
  );
}

export default Landing;