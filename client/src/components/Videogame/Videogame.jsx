import React from "react";
import { Link } from 'react-router-dom';
import photo from '../../images/photo.png'
import s from './videogame.module.css'

export default function Videogame(props){
  return(
    <div className={s.containerGame}>
      <div className={s.titleGame}>{props.name}</div>

      <div className={s.imgDiv}>
        {props.image ? (
          <img src={`${props.image}`} alt="Videogame" className="Img" />
        ) : (
          <img src={photo} alt="Videogame" className="Img" />
        )}
      </div>

      <div className={s.infoRating}>
        {<p>  <strong>Rating: </strong> {`${props.rating}`}  </p>}
      </div>

      <div className={s.infoContGenres}>
        {
          <p>
            <strong>Genres: </strong>{' '}
            {`${
              typeof props.genres === 'string'
              ? props.genres
              : props.genres.join(', ')
            }`};
          </p>
        }
      </div>

      <div className={s.btnDiv}>
        {props.id && (
          <Link to={`/videogame/${props.id}`}>
            <button className={s.btn}>Details</button>
          </Link>
        )}
      </div>
    </div>
  );
}