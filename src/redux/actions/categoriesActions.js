import { GET_MOVIES, MOVIES_LOADING, MOVIES_FAILED, GET_MOVIES_ERROR } from '../constants/categoriesConstants'

export const getMovies = (movies) => (dispatch, getState) => {
    dispatch({
        type: GET_MOVIES,
        payload: movies
    })
}

export const getMoviesError = (error) => (dispatch, getState) => {
    dispatch({
        type: GET_MOVIES_ERROR,
        payload: error
    })
}

export const moviesLoading = (isLoading) => (dispatch, getState) => {
    dispatch({
        type: MOVIES_LOADING,
        payload: isLoading
    })
}

export const moviesFailed = (hasFailed) => (dispatch, getState) => {
    dispatch({
        type: MOVIES_FAILED,
        payload: hasFailed
    })
}