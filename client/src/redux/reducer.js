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
    case GET_DOGS:
      return {
        ...state,
        dogsList: action.payload
      };
    case ADD_DOG:
      return {
        ...state,
        dogsList: [...state.dogsList, action.payload]
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperamentOptions: action.payload,
      };
    case SRC_DOG:
      return {
        ...state,
        dogsList: action.payload
      };
    case SORT_DOGS_BY_NAME_ASC:
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => a.name.localeCompare(b.name))
      };
    case SORT_DOGS_BY_NAME_DESC:
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => b.name.localeCompare(a.name))
      };
    case FILTER_DOGS_BY_WEIGHT_ASC:
      return {
        ...state,
        dogsList: state.dogsList.slice().sort((a, b) => {
          const weightA = parseInt(a.weight.metric?.split(' - ')[0] || a.weight.min?.split(' - ')[0]);
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
        dogsList: state.dogsList.filter((dog) => dog.temperament?.includes(selectedTemperament))
      };
    case FILTER_DOGS_BY_ORIGIN:
      const selectedOrigin = action.payload;
      if (selectedOrigin === 'api') {
        return {
          ...state,
          dogsList: state.dogsList.filter((dog) => !isNaN(dog.id))
        };
      } else if (selectedOrigin === 'db') {
        return {
          ...state,
          dogsList: state.dogsList.filter((dog) => isNaN(dog.id))
        };
      } else {
        return state;
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
