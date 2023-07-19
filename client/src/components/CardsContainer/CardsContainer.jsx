import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './CardsContainer.module.css';

const CardsContainer = () => {
  const dogs = useSelector((state) => state.dogsList); // Cambia el nombre del estado a 'dogsList'
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = 8;

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  return (
    <div className={styles.container}>
      {currentDogs.map(({ id, name, image, weight, temperament }) => (
        <Card
          key={id}
          id={id}
          name={name}
          image={image.url || image}
          weight={weight}
          temperament={temperament}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default CardsContainer;

