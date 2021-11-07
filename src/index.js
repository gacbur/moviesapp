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
import { genresReducer } from './redux/reducers/genresReducer'

const reducers = combineReducers({
  movies: moviesReducer,
  singleMovie: singleMovieReducer,
  favMovies: favMoviesReducer,
  genres: genresReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(

  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
