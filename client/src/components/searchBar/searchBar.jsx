import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogs } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
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
