import React from "react";
import {NavLink} from 'react-router-dom'
import s from './navBar.module.css'

export default function NavBar(){
  return(
    <div className={s.container}>
      <NavLink to='/'><button>Intro</button></NavLink>
      <NavLink to='/videogames'><button>Videogames</button></NavLink>
      <NavLink to='/createGame'><button>CreateGame</button></NavLink>
      <NavLink to='/about'><button>About</button></NavLink>
    </div>
  );
}