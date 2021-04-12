import * as actionTypes from '../constants/favMovieConstants'

export const addFavMovie = (movie) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ADD_FAV_MOVIE,
        payload: movie
    })

    localStorage.setItem('favMovies', JSON.stringify(getState().favMovies.favMovies))
}

export const removeFromFavorite = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FAV_MOVIE,
        payload: id
    })

    localStorage.setItem('favMovies', JSON.stringify(getState().favMovies.favMovies))
}

