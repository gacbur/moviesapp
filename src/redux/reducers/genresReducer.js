import { GET_MOVIES, MOVIES_LOADING, MOVIES_FAILED, GET_MOVIES_ERROR, GET_GENRES, PICK_GENRES } from '../constants/genresConstants'

const initialState = {
    moviesByGenre: [],
    moviesByGenre_loading: true,
    moviesByGenre_failed: false,
    moviesByGenre_error: false,
    genres: [],
    pickedGenres: []
}

export const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                moviesByGenre: action.payload
            }
        case GET_MOVIES_ERROR:
            return {
                ...state,
                moviesByGenre_failed: false,
                moviesByGenre_error: action.payload
            }
        case MOVIES_LOADING:
            return {
                ...state,
                moviesByGenre_loading: action.payload
            }
        case MOVIES_FAILED:
            return {
                ...state,
                moviesByGenre_failed: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case PICK_GENRES:
            return {
                ...state,
                pickedGenres: action.payload
            }
        default:
            return state
    }
}