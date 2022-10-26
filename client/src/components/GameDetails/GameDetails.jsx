import React, { useEffect } from "react";
import {connect} from 'react-redux';
import { getVideogameDetail } from "../../redux/actions";
import NavBar from "../NavBar/NavBar.jsx";
import { NavLink } from "react-router-dom";
import s from './gameDetails.module.css'
import photo from '../../images/photo.png';

const GameDetails = (props) => {

  const {getVideogameDetail, gameDetails} = props;
  const idVideogame = props.match.params.idVideogame;

  useEffect(() => {
    getVideogameDetail(idVideogame);
    console.log(props);
  }, [idVideogame]);

  return(
    <div className={s.mainContainer}>
      <NavBar />
      <div className={s.detailsDiv}>
      {
        gameDetails ? (
          <div>
            <h3 className={s.title}>{gameDetails.name}</h3>
            {
              gameDetails.background_image ? (
                <div className={s.imgDiv}>
                  <img src={gameDetails.background_image} alt="Videogame" />
                  {console.log(gameDetails)}
                </div>
              ) : (
                <div className={s.imgDiv}>
                  <img src={photo} alt="Videogame" />
                </div>
              )
            } {/* IMAGEN */}

            {
              <p className={s.release}>
                <strong>Release Date</strong>:{' '}
                {`${gameDetails.released || 'None'}`}
              </p>
            } {/* RELEASE DATE */}

            <p className={s.rating}>
              <strong>Rating</strong>:{' '} {gameDetails.rating}{/* DIFERENT ---------------------------------- */}
            </p> {/* RATING */}

            {
              gameDetails.description && gameDetails.genres && gameDetails.platforms ? (
                <div className={s.descriptionDiv}>
                  {
                    <p className={s.description}>
                      {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                  } {/* DESCRIPTION */}
                  {
                    <p>
                      <strong>Genres: </strong>
                      {`${gameDetails.genres.join(', ')}`}
                    </p>
                  } {/* GENRES */}
                  {
                    <p>
                      <strong>Platforms: </strong>
                      {typeof gameDetails.platforms === 'string' ? (  
                        gameDetails.platforms
                      ) : (
                        gameDetails.platforms.join(', ')
                      )}  {/* DIFERENT ---------------------------------- */}
                    </p>
                  } {/* PLATFORMS */}
                  <NavLink to='/videogames'>
                    <button>Back</button>
                  </NavLink>
                </div>
              ) : (
                <h1>Loading...</h1>
              )
            }
          </div>
        ) : (
          <h1>Loading...</h1>
        )
      }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return{
    gameDetails: state.gameDetails
  }
};

export default connect(mapStateToProps, {getVideogameDetail})(GameDetails);

