import * as actionTypes from '../constants/movieConstants'

export const getMovies = (movies) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_MOVIES,
        payload: movies
    })
}

export const getSingleMovie = (movie) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_SINGLE_MOVIE,
        payload: movie
    })
}

export const resetSingleMovie = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.RESET_SINGLE_MOVIE
    })
}

export const getSimiliarMovies = (movies) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_SIMILIAR_MOVIES,
        payload: movies
    })
}

export const getSingleMovieCrewAndCast = (crew, cast) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_SINGLE_MOVIE_CREW_AND_CAST,
        payload: {
            crew,
            cast
        }
    })
}