import { GET_MOVIES, MOVIES_LOADING, MOVIES_FAILED, GET_MOVIES_ERROR } from '../constants/categoriesConstants'

const initialState = {
    moviesByCategory: [],
    moviesByCategory_loading: true,
    moviesByCategory_failed: false,
    moviesByCategory_error: false
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
        default:
            return state
    }
}