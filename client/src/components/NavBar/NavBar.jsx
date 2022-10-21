import React from "react";
import {NavLink} from 'react-router-dom'

export default function NavBar(){
  return(
    <div className="navbar-div">
      <NavLink to='/'><button>Intro</button></NavLink>
      <NavLink to='/videogames'><button>Videogames</button></NavLink>
      <NavLink to='/createGame'><button>CreateGame</button></NavLink>
      <NavLink to='/about'><button>About</button></NavLink>
    </div>
  );
}