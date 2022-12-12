import React from "react";
import { Link } from "react-router-dom";
import s from './landing.module.css';

const Landing = () => {
  return(
    <div className={s.container}>
      <Link to='/videogames'>
        <button className={s.btn}>PRESS START</button>
      </Link>
    </div>
  )
}

export default Landing;