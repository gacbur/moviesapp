import * as actionTypes from '../constants/movieConstants'

const INITIAL_STATE = {
    movies: [],
    movies_loaded: false,
}

export const moviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case actionTypes.MOVIES_LOADING:
            return {
                ...state,
                movies_loaded: action.payload
            }
        default:
            return state
    }
}