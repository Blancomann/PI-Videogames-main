import React from "react";
import { Link } from "react-router-dom";
import wallpaper from '../../images/LandingWallpaper.png'
import s from './landing.module.css';

const Landing = () => {
  return(
    <div className={s.container}>
      {/* <img className="wallpaper" src={wallpaper} alt="wallpaper" /> */}
      <Link to='/videogames'>
        <button className={s.btn}>PRESS START</button>
      </Link>
    </div>
  )
}

export default Landing;