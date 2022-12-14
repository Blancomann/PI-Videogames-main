import {GET_ALL_GAMES, SEARCH_BY_NAME, GET_VIDEOGAME_DETAIL, GET_GENRES, ORDER_BY, FILTER_BY, PAGINATION} from './actions.js'


const initialState = {
  allGames: [],
  gamesBackUp: [],
  gameDetails: [],
  genres: [],
  filtered: [],
  page: 1,
};

export default function reducer(state = initialState, action){
  switch(action.type){
    case GET_ALL_GAMES:
      return{
        ...state,
        allGames: action.payload,
        gamesBackUp: action.payload,
        filtered: action.payload
      }

    case GET_VIDEOGAME_DETAIL:
      return{
        ...state,
        gameDetails: action.payload
      }

    case SEARCH_BY_NAME:
      return{
        ...state,
        gamesBackUp: action.payload,
        filtered: action.payload
      }

    case GET_GENRES:
      return{
        ...state,
        genres: action.payload
      }

    case PAGINATION:
      return{
        ...state,
        page: action.payload
      }

    case FILTER_BY:
      if(action.payload === 'default'){
        return{...state, filtered: state.gamesBackUp};
      }
      if(action.payload === 'DB'){
        return{...state, filtered: state.gamesBackUp.filter((g) => (typeof g.id) === 'string')}
      }
      if(action.payload === 'API'){
        return{...state, filtered: state.gamesBackUp.filter((g) => (typeof g.id) === 'number')}
      }
      else{
        return{...state, filtered: state.gamesBackUp.filter((g) => {
          return g.genres.find((ge) => {
            return ge === action.payload
          })
        })}
      }

    case ORDER_BY:
      if(action.payload === 'A-Z'){
        return{...state, filtered: [...state.filtered].sort((prev, next) => {
          if(prev.name > next.name) return 1
          if(prev.name < next.name) return -1
          return 0
        })}
      }
      if(action.payload === 'Z-A'){
        return{...state, filtered: [...state.filtered].sort((prev, next) => {
          if(prev.name > next.name) return -1
          if(prev.name < next.name) return 1
          return 0
        })}
      }
      if(action.payload === 'desc'){
        return{...state, filtered: [...state.filtered].sort((prev, next) => prev.rating - next.rating)}
      }
      if(action.payload === 'asc'){
        return{...state, filtered: [...state.filtered].sort((prev, next) => next.rating - prev.rating)}
      }
      else{
        return{...state, filtered: state.gamesBackUp}
      }

    default: 
      return {...state}

  }
};