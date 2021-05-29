import { GET_MOVIES, MOVIES_LOADING, MOVIES_FAILED, GET_MOVIES_ERROR, GET_GENRES, PICK_GENRES } from '../constants/categoriesConstants'

const initialState = {
    moviesByCategory: [],
    moviesByCategory_loading: true,
    moviesByCategory_failed: false,
    moviesByCategory_error: false,
    genres: [],
    pickedGenres: []
}

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                moviesByCategory: action.payload
            }
        case GET_MOVIES_ERROR:
            return {
                ...state,
                moviesByCategory_failed: false,
                moviesByCategory_error: action.payload
            }
        case MOVIES_LOADING:
            return {
                ...state,
                moviesByCategory_loading: action.payload
            }
        case MOVIES_FAILED:
            return {
                ...state,
                moviesByCategory_failed: action.payload
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