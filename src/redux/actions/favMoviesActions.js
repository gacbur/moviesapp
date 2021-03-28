import * as actionTypes from '../constants/favMovieConstants'

export const addFavMovie = (movie) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ADD_FAV_MOVIE,
        payload: movie
    })
}

export const updateFavMovies = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.UPDATE_FAV_MOVIES,
        payload: id
    })
}

export const getFavMovies = (favMovies) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_FAV_MOVIES,
        payload: favMovies
    })
}