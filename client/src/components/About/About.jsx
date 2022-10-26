import React from "react";
import NavBar from '../NavBar/NavBar.jsx';
import s from './about.module.css'
import rock from '../../images/About.gif'
import git from '../../images/git.jpg'
import { Link } from "react-router-dom";

const About = () => {

  const handleClick = () => {
    window.open('https://github.com/Blancomann', '_blank')
    }

  return(
    <div className={s.container}>
      <NavBar />
      <div className={s.containerAbout}>
        <h1>Individual Project</h1>
        <h2>Videogames</h2>
        <img src={rock} alt="The End" />
        <h3>Blanco Belmont, Mario Agustín</h3>
        <div className={s.gitDiv}>
          <img src={git} alt="GitHub" onClick={handleClick} />
          <button onClick={handleClick}>Blancomann</button>
        </div>
      </div>
    </div>
  )
}

export default About;