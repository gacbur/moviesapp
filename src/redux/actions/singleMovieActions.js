import * as actionTypes from '../constants/singleMovieConstants'


export const getSingleMovie = (movie) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_SINGLE_MOVIE,
        payload: movie
    })
}

export const singleMovieLoading = (isLoading) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.SINGLE_MOVIE_LOADING,
        payload: isLoading
    })
}

export const resetSingleMovie = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.RESET_SINGLE_MOVIE
    })
}

export const getSingleMovieGallery = (galleryItems) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_SINGLE_MOVIE_GALLERY,
        payload: galleryItems
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