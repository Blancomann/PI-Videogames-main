import axios from 'axios'

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const ORDER_BY = 'ORDER_BY';
export const FILTER_BY = 'FILTER_BY';

export const getAllGames = () => {
  return (dispatch) => {
    return axios
      .get('/videogames/')
      .then((res) => {
        dispatch({ type: GET_ALL_GAMES, payload: res.data })
      })
      .catch((e) => {return e})
  }
};

export const searchByName = (name) => {
  return (dispatch) => {
    return axios
      .get(`/videogames?name=${name}`)
      .then((res) => {
        dispatch({ type: SEARCH_BY_NAME, payload: res.data })
      })
      .catch((e) => {return e})
  }
};

export const getVideogameDetail = (id) => {
  return (dispatch) => {
    return axios
      .get(`/videogame/${id}`)
      .then((res) => {
        dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data })
      })
      .then((res) => console.log(res))
      .catch((e) => {return e})
  }
};

export const getGenres = () => {
  return (dispatch) => {
    return axios
      .get('/genres')
      .then((res) => {
        dispatch({ type: GET_GENRES, payload: res.data })
      })
      .catch((e) => {return e})
  }
};

export const filterBy = (filter) => {
  return (dispatch) => {
    dispatch({ type: FILTER_BY, payload: filter })
  }
};

export const orderBy = (order) => {
  return (dispatch) => {
    dispatch({ type: ORDER_BY, payload: order })
  }
};