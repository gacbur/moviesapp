import * as actionTypes from '../constants/singleMovieConstants'

const INITIAL_STATE = {
    singleMovie: {},
    singleMovie_gallery: [],
    singleMovie_cast: [],
    singleMovie_crew: [],
    singleMovie_loading: true,
    similiarMovies: []
}

export const singleMovieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_SINGLE_MOVIE:
            return {
                ...state,
                singleMovie: action.payload,
                singleMovie_loaded: true,
            }
        case actionTypes.SINGLE_MOVIE_LOADING:
            return {
                ...state,
                singleMovie_loading: action.payload
            }
        case actionTypes.RESET_SINGLE_MOVIE:
            return {
                ...state,
                singleMovie: {}
            }
        case actionTypes.GET_SINGLE_MOVIE_GALLERY:
            return {
                ...state,
                singleMovie_gallery: [...action.payload]
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