import axios from 'axios';
import {
  GET_DOGS,
  ADD_DOG,
  SRC_DOG,
  GET_TEMPERAMENTS,
  SET_CURRENT_PAGE,
  FILTER_DOGS,
  SORT_DOGS,
  SORT_DOGS_BY_NAME_ASC,
  SORT_DOGS_BY_NAME_DESC,
  FILTER_DOGS_BY_WEIGHT_ASC,
  FILTER_DOGS_BY_WEIGHT_DESC,
  FILTER_DOGS_BY_TEMPERAMENT,
  FILTER_DOGS_BY_ORIGIN,
} from './actionsTypes';

export const getDogs = () => {//funcion para obtener la lista de los perros
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/dogs');
      const dogs = apiData.data;
      
      dispatch({ type: GET_DOGS, payload: dogs });//se despacha a la store con el payload que contiene los datos de los perros.
    } catch (error) {
      console.error(error);
    }
  };
};

export const addDog = (dog) => { //funcion que realiza una solicitud POST para agregar un nuevo perro a la base de datos
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/dogs', dog);
      dispatch({ type: ADD_DOG, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTemperaments = () => { // funcion para obtener la lista de temperamentos de los perros.
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/temperaments');
      const temperaments = response.data;

      // Convertir el objeto de temperamentos en un arreglo
      const temperamentsArray = Object.values(temperaments);

      dispatch({ type: GET_TEMPERAMENTS, payload: temperamentsArray });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchDogs = (name) => {//función que toma el parámetro name y realiza una solicitud GET para buscar perros que coincidan con el nombre proporcionado.
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);

      if (data.length > 0) {
        dispatch({
          type: SRC_DOG,
          payload: data
        });
      } else {
        alert('No hay perros con este nombre');
      }
    } catch (error) {
      console.error(error);
      alert('Error al buscar perros.');
    }
  };
};

export const setCurrentPage = (pageNumber) => { //funcion que contiene el numero de pagina actual. Actualiza a la pagina actual
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
};

export const filterDogs = (filters) => {
  return {
    type: FILTER_DOGS,
    payload: filters,
  };
};

export const sortDogs = (option) => {
  return {
    type: SORT_DOGS,
    payload: option,
  };
};

export const sortDogsByNameAsc = () => {
  return {
    type: SORT_DOGS_BY_NAME_ASC
  };
};

export const sortDogsByNameDesc = () => {
  return {
    type: SORT_DOGS_BY_NAME_DESC
  };
};

export const filterDogsByWeightAsc = () => {
  return {
    type: FILTER_DOGS_BY_WEIGHT_ASC,
  };
};

export const filterDogsByWeightDesc = () => {
  return {
    type: FILTER_DOGS_BY_WEIGHT_DESC,
  };
};

export const filterDogsByTemperament = (temperament) => {
  return {
    type: FILTER_DOGS_BY_TEMPERAMENT,
    payload: temperament,
  };
};

export const filterDogsByOrigin = (origin) => {
  return {
    type: FILTER_DOGS_BY_ORIGIN,
    payload: origin,
  };
};
