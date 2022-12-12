import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres } from "../../redux/actions";
import { getPage } from "../../redux/actions";
import s from './videogames.module.css'

import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import FilterBy from "../FilterBy/FilterBy.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import Videogame from "../Videogame/Videogame.jsx";
import notFound from '../../images/errorTV.gif'
import loading from '../../images/loading2.gif'


const Videogames = ({  allGames, getAllGames, getGenres  }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  const [currentPage, setCurrentPage] = useState(page);

  const [cardPerPage] = useState(15);

  const indexLastCard = currentPage * cardPerPage;
  const indexFirstCard = indexLastCard - cardPerPage;

  var currentCards;

  if(typeof allGames === 'string'){
    currentCards = allGames
  }else{
    currentCards = allGames.slice(indexFirstCard, indexLastCard);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(getPage(pageNumber))
  };

  useEffect(() => {
    getAllGames()
    getGenres()
  }, []);

  return(
    <div className="container">
      <NavBar />
      <SearchBar />
      <FilterBy />
      <Pagination 
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className={s.gamesDiv}>
      {console.log('AAAAAAAAA', process.env.REACT_APP_API)}
        {
          currentCards.length > 1 ? (
            currentCards.map((g) => (
              <Videogame 
                key={g.id}
                name={g.name}
                rating={g.rating}
                genres={g.genres}
                image={g.background_image}
                id={g.id}
              />
            ))
          ) : (typeof currentCards === 'string' ? (
            <div>
              <img className={s.notFound} src={notFound} alt="notFound" />
            </div>
          ) : (
            <div>
              <img className={s.loading} src={loading} alt="loading" />
            </div>))
        }
      </div>
      <Pagination 
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allGames: state.filtered
  }
};

export default connect(mapStateToProps, { getAllGames, getGenres })(Videogames);