import * as actionTypes from '../constants/favMovieConstants'

const INITIAL_STATE = {
    favMovies: [],
    favMovies_loaded: false
}

export const favMoviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAV_MOVIE:
            return {
                ...state,
                favMovies: [...state.favMovies, action.payload]
            }
        case actionTypes.UPDATE_FAV_MOVIES:

            let tempFavMovies = [...state.favMovies]

            tempFavMovies = tempFavMovies.filter(item => item.movieId !== String(action.payload))

            return {
                ...state,
                favMovies: tempFavMovies,
            }
        case actionTypes.GET_FAV_MOVIES:
            return {
                ...state,
                favMovies: action.payload,
                favMovies_loaded: true
            }
        default:
            return state;
    }
}
