import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import { moviesReducer } from './redux/reducers/moviesReducer'
import { singleMovieReducer } from './redux/reducers/singleMovieReducer'
import { favMoviesReducer } from './redux/reducers/favMoviesReducer'
import { categoriesReducer } from './redux/reducers/categoriesReducer'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './material-ui/theme'

const reducers = combineReducers({
  movies: moviesReducer,
  singleMovie: singleMovieReducer,
  favMovies: favMoviesReducer,
  categories: categoriesReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
