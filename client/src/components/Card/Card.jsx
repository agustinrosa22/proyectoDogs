import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  const formatWeight = `${props.weight.min || props.weight.metric} - ${props.weight.max}`;//identifica si es un peso de la DB o API 
  
  return (
    <div className={styles.card}>
      <Link to={`/detail/${props.id}`} className={styles.link}>
        <p className={styles.name}>Name: {props.name}</p>
        <img src={props.image} alt={props.name} className={styles.image} />
        <p className={styles.temperament}>Temperaments: {props.temperaments?.map(temp=>temp.name) || props.temperament?.split(',')}</p>
        <p className={styles.weight}>Weight: {props.weight.metric || formatWeight}</p>
      </Link>
    </div>
  );
};

export default Card;

