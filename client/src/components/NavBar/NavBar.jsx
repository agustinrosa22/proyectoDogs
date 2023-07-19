import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import style from './NavBar.module.css';

const NavBar = () => {
  const handleSearch = (name) => {
    console.log(`Buscar por nombre: ${name}`);
  };

  return (
    <div className={style.mainContainer}>
      <SearchBar onSearch={handleSearch} />
      <Link to="/home" className={style.link}>HOME</Link>
      <Link to="/create" className={style.link}>FORM</Link>
    </div>
  );
}

export default NavBar;
