import React, { useState } from "react";
import {connect} from 'react-redux'
import { searchByName, getAllGames } from "../../redux/actions";
import s from './searchBar.module.css'

const SearchBar = ({searchByName, getAllGames}) => {
  const [input, setInput] = useState({
    buscar: '',
  });

  const handleInputChange = (e) => {
    // console.log(e.target);
    setInput({
      [e.target.name]: e.target.value
    })
  };

  const handleOnClick = () => {
    searchByName(input.buscar)
    setInput({buscar: ''})
  };

  const handleOnClickAll = () => {
    getAllGames()
    setInput({buscar: ''})
  };

  return(
    <div className={s.searchbarDiv}>
      <input 
        className={s.textInput} type="text" 
        name="buscar" placeholder="Buscá tu juego..." 
        onChange={handleInputChange} value={input.buscar}
        autoComplete='off'
      />
      <button className={s.btn} onClick={handleOnClick}>Buscar</button>
      <button className={s.btn} onClick={handleOnClickAll}>CargarTodos</button>
    </div>
  );
};

export default connect(null, {searchByName, getAllGames})(SearchBar);