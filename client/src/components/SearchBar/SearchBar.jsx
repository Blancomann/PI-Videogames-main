import React, { useState } from "react";
import {connect} from 'react-redux'
import { searchByName, getAllGames } from "../../redux/actions";

const SearchBar = ({searchByName, getAllGames}) => {
  const [input, setInput] = useState({
    buscar: '',
  });

  const handleInputChange = (e) => {
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
    <div className="searchbar-div">
      <input 
        className="bar-btn" type="text" 
        name="buscar" placeholder="Buscá tu juego..." 
        onChange={handleInputChange} value={input.buscar}
        autoComplete='off'
      />
      <button className="btn" onClick={handleOnClick}>Buscar</button>
      <button className="btn" onClick={handleOnClickAll}>CargarTodos</button>
    </div>
  );
};

export default connect(null, {searchByName, getAllGames})(SearchBar);