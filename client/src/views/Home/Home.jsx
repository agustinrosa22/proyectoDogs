import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';
import {
  getDogs,
  sortDogsByNameAsc,
  sortDogsByNameDesc,
  filterDogsByWeightAsc,
  filterDogsByWeightDesc,
  filterDogsByOrigin,
  getTemperaments,
  setCurrentPage,
  filterDogsByTemperament
} from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();//useDispatch para obtener la función dispatch para enviar acciones al store
  const dogsList = useSelector((state) => state.dogsList);//useSelector para obtener el estado 'dogsList' desde el store
  const temperaments = useSelector((state) => state.temperamentOptions);//useSelector para obtener el estado 'temperamentOptions' desde el store
  const currentPage = useSelector((state) => state.currentPage);//useSelector para obtener el estado 'temperamentOptions' desde el store
  const dogsPerPage = 8;

  const [selectedTemperament, setSelectedTemperament] = useState('');//Estado local para almacenar el temperamento seleccionado en el filtro
  const [selectedOrigin, setSelectedOrigin] = useState('');//Estado local para almacenar el origen seleccionada en el filtro

  useEffect(() => {//useEffect para obtener la lista de perros y los temperamentos disponibles cuando el componente se monta
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

// Funciones para manejar los filtros y la clasificación de los perros
  const handleSortByNameAsc = () => {
    dispatch(sortDogsByNameAsc());
  };

  const handleSortByNameDesc = () => {
    dispatch(sortDogsByNameDesc());
  };

  const handleFilterByWeightAsc = () => {
    dispatch(filterDogsByWeightAsc());
  };

  const handleFilterByWeightDesc = () => {
    dispatch(filterDogsByWeightDesc());
  };

  const handleFilterByOrigin = () => {
    if (selectedOrigin !== '') {
      dispatch(filterDogsByOrigin(selectedOrigin));
    }
  };
  const handleFilterByTemperament = () => {
    if (selectedTemperament !== '') {
      dispatch(filterDogsByTemperament(selectedTemperament));
    }
  };


  const handleReset = () => {
    dispatch(getDogs());
    setSelectedTemperament('');
    setSelectedOrigin('');
  };

  // Paginado
  //Se obtienen los perros correspondientes a la página actual para mostrar en el CardsContainer
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsList.slice(indexOfFirstDog, indexOfLastDog);
  const totalPages = Math.ceil(dogsList.length / dogsPerPage);//calculo el número total de páginas necesarias para la paginación

  const handlePageChange = (pageNumber) => {// Función para manejar el cambio de página en la paginación
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <body className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>BIENVENIDOS!!!</h1>
        <div className={styles.optionsContainer}>
        <select
            value={selectedTemperament}
            onChange={(e) => setSelectedTemperament(e.target.value)}
          >
            <option value="">Select a temperament</option>
            {temperaments.map((temperament) => (
              <option key={temperament.id} value={temperament.name}>
                {temperament.name}
              </option>
            ))}
          </select>
          <button onClick={handleFilterByTemperament}>Filter by Temperament</button>
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value="">Select an origin</option>
            <option value="api">API Dogs</option>
            <option value="db">DB Dogs</option>
          </select>
          <button onClick={handleFilterByOrigin}>Filter by Origin</button>
          <select
            onChange={(e) => {
              if (e.target.value === 'nameAsc') handleSortByNameAsc();
              if (e.target.value === 'nameDesc') handleSortByNameDesc();
              if (e.target.value === 'weightAsc') handleFilterByWeightAsc();
              if (e.target.value === 'weightDesc') handleFilterByWeightDesc();
            }}
          >
            <option value="">Select an option</option>
            <option value="nameAsc">Sort by Name (Asc)</option>
            <option value="nameDesc">Sort by Name (Desc)</option>
            <option value="weightAsc">Filter by Weight (Asc)</option>
            <option value="weightDesc">Filter by Weight (Desc)</option>
          </select>
          <button onClick={handleReset}>Reset Filters</button>
        </div>
        <CardsContainer dogs={currentDogs} className={styles.cardsContainer} />
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={`page_${page}`} // Asignamos una clave única a cada botón de página
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? `${styles.pageButton} ${styles.activePage}` : styles.pageButton}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </body>
  );
};

export default Home;
