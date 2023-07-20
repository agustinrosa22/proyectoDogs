import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogs } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();//e utilizará para enviar la acción searchDogs al store cuando el usuario realice una búsqueda.
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => { // La función actualiza el estado searchTerm con el valor actual del input de búsqueda.
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => { //cuando el usuario hace clic en el botón de búsqueda. La función envía la acción searchDogs al store de Redux, pasando searchTerm como parámetro. Esto activa la búsqueda de perros
    dispatch(searchDogs(searchTerm));
  };

  return (
    <div>
      <input
        type="search"
        onChange={handleChange}
        value={searchTerm}
        placeholder="Search dogs"
      />
      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default SearchBar;
