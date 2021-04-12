import * as actionTypes from '../constants/favMovieConstants'

const INITIAL_STATE = {
    favMovies: localStorage.getItem('favMovies') ? JSON.parse(localStorage.getItem('favMovies')) : [],
    favMovies_loaded: false
}

export const favMoviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAV_MOVIE:
            return {
                ...state,
                favMovies: [...state.favMovies, action.payload]
            }
        case actionTypes.REMOVE_FAV_MOVIE:

            let tempFavMovies = [...state.favMovies]

            tempFavMovies = tempFavMovies.filter(item => item.movieId !== String(action.payload))

            return {
                ...state,
                favMovies: tempFavMovies,
            }
        default:
            return state;
    }
}
