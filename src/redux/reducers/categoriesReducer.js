import { GET_MOVIES, MOVIES_LOADING } from '../constants/categoriesConstants'

const initialState = {
    moviesByCategory: [],
    moviesByCategory_loading: true
}

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                moviesByCategory: action.payload
            }
        case MOVIES_LOADING:
            return {
                ...state,
                moviesByCategory_loading: action.payload
            }
        default:
            return state
    }
}