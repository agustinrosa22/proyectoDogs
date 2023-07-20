import {
  GET_DOGS,
  ADD_DOG,
  SRC_DOG,
  GET_TEMPERAMENTS,
  SORT_DOGS_BY_NAME_ASC,
  SORT_DOGS_BY_NAME_DESC,
  FILTER_DOGS_BY_WEIGHT_ASC,
  FILTER_DOGS_BY_WEIGHT_DESC,
  FILTER_DOGS_BY_TEMPERAMENT,
  FILTER_DOGS_BY_ORIGIN,
  SET_CURRENT_PAGE,
} from './actionsTypes';

const initialState = {
  dogsList: [],
  temperamentOptions: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS://actualiza el estado dogsList
      return {
        ...state,
        dogsList: action.payload
      };
    case ADD_DOG: // agrega un nuevo perro al estado dogsList
      return {
        ...state,
        dogsList: [...state.dogsList, action.payload]
      };
    case GET_TEMPERAMENTS: //actualiza el estado temperamentOptions
      return {
        ...state,
        temperamentOptions: action.payload,
      };
    case SRC_DOG: // actualiza el estado dogsList en el store con los datos de los perros encontrados mediante la búsqueda.
      return {
        ...state,
        dogsList: action.payload
      };
    case SORT_DOGS_BY_NAME_ASC: // ordena el estado dogsList
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => a.name.localeCompare(b.name))
      };
    case SORT_DOGS_BY_NAME_DESC:
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => b.name.localeCompare(a.name))
      };
    case FILTER_DOGS_BY_WEIGHT_ASC: //se filtra el estado dogsList
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => {
          const weightA = parseInt(a.weight.metric?.split(' - ')[0] || a.weight.min?.split(' - ')[0]);//si es de la API toma weight.metric y es de la DB weight.min
          const weightB = parseInt(b.weight.metric?.split(' - ')[0] || b.weight.min?.split(' - ')[0]);
          return weightA - weightB;
        })
      };
    case FILTER_DOGS_BY_WEIGHT_DESC:
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => {
          const weightA = parseInt(a.weight.metric?.split(' - ')[0] || a.weight.min?.split(' - ')[0]);
          const weightB = parseInt(b.weight.metric?.split(' - ')[0] || b.weight.min?.split(' - ')[0]);
          return weightB - weightA;
        })
      };
    case FILTER_DOGS_BY_TEMPERAMENT:
      const selectedTemperament = action.payload;
      return {
      ...state,
      dogsList: state.dogsList.filter((dog) => { 
      const hasTemperament = dog.temperament?.includes(selectedTemperament); //el filtrado para los perros de la API
      const hasTemperaments = dog.temperaments?.some((temp) => temp.name === selectedTemperament); //filtrado para los perros de la DB
      return hasTemperament || hasTemperaments; //si el perro contiene alguna de las 2 sera parte de la lista filtrada
        })
      };
      
    case FILTER_DOGS_BY_ORIGIN:
      const selectedOrigin = action.payload;
      if (selectedOrigin === 'api') {
        return {
          ...state,
          dogsList: state.dogsList.filter((dog) => !isNaN(dog.id))//verifica que sean numeros las id para saber si son de la API
        };
      } else if (selectedOrigin === 'db') {
        return {
          ...state,
          dogsList: state.dogsList.filter((dog) => isNaN(dog.id)) // verifica que no sean numeros las id para saber que son de la DB
        };
      } else {
        return state;
      }
    case SET_CURRENT_PAGE: //actualiza el estado a la pagina seleccionada
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
