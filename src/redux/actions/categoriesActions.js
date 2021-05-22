import { GET_MOVIES, MOVIES_LOADING } from '../constants/categoriesConstants'

export const getMovies = (movies) => (dispatch, getState) => {
    dispatch({
        type: GET_MOVIES,
        payload: movies
    })
}

export const moviesLoading = (isLoading) => (dispatch, getState) => {
    dispatch({
        type: MOVIES_LOADING,
        payload: isLoading
    })
}