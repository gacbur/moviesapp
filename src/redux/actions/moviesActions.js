import * as actionTypes from '../constants/movieConstants'

export const getMovies = (movies) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_MOVIES,
        payload: movies
    })
}

export const moviesLoading = (isLoading) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.MOVIES_LOADING,
        payload: isLoading
    })
}

