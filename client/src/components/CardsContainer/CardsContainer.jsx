import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './CardsContainer.module.css';

const CardsContainer = () => {
  const dogs = useSelector((state) => state.dogsList); // Cambia el nombre del estado a 'dogsList', es una lista de perros que se utiliza para mostrar la información en las tarjetas.
  const currentPage = useSelector((state) => state.currentPage); // currentPage representa la página actual que se está mostrando en la paginación de las tarjetas.
  const dogsPerPage = 8;

  const indexOfLastDog = currentPage * dogsPerPage; // Calcula el índice del último perro que se mostrará en la página actual.
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // Calcula el índice del primer perro que se mostrará en la página actual.
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); // Se utiliza el método slice() para obtener los perros desde el índice indexOfFirstDog hasta el índice indexOfLastDog.
//console.log(currentDogs)
  return (
    <div className={styles.container}>
      {currentDogs.map(({ id, name, image, weight, temperament, temperaments }) => (
        <Card
          key={id}
          id={id}
          name={name}
          image={image.url || image}
          weight={weight}
          temperament={temperament}
          temperaments={temperaments}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default CardsContainer;

