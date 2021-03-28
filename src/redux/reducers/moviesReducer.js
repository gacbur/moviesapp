import * as actionTypes from '../constants/movieConstants'

const INITIAL_STATE = {
    movies: [],
    movies_loaded: false,
    singleMovie: {},
    singleMovie_cast: [],
    singleMovie_crew: [],
    singleMovie_loaded: false,
    similiarMovies: []
}

export const moviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                movies_loaded: true
            }
        case actionTypes.GET_SINGLE_MOVIE:
            return {
                ...state,
                singleMovie: action.payload,
                singleMovie_loaded: true,
            }
        case actionTypes.RESET_SINGLE_MOVIE:
            return {
                ...state,
                singleMovie: {}
            }
        case actionTypes.GET_SINGLE_MOVIE_CREW_AND_CAST:
            return {
                ...state,
                singleMovie_cast: action.payload.cast,
                singleMovie_crew: action.payload.crew
            }
        case actionTypes.GET_SIMILIAR_MOVIES:
            return {
                ...state,
                similiarMovies: action.payload
            }
        default:
            return state
    }
}