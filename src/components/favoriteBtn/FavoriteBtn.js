import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { addFavMovie, getFavMovies } from '../../redux/actions/favMoviesActions'

import { BsFillHeartFill } from 'react-icons/bs'


const FavoriteBtn = ({ movieId, movieInfo, moviePoster }) => {

    const favMovies = useSelector(state => state.favMovies.favMovies)
    const favMovies_loaded = useSelector(state => state.favMovies.favMovies_loaded)

    const [inFavorite, setInFavorite] = useState(false)
    const dispatch = useDispatch()

    const movieData = {
        movieId: movieId,
        movieTitle: movieInfo.title,
        movieImage: movieInfo.backdrop_path,
        moviePoster: moviePoster,
        MovieRunTime: movieInfo.runtime,
    }

    useEffect(() => {
        Axios.get('https://mernmoviesapp.herokuapp.com/api/movie/getFavMovies')
            .then((response) => {
                if (response.status === 200) {
                    dispatch(getFavMovies(response.data))
                } else {
                    console.log('Failed getting favMovies')
                }
            })
    }, [])

    useEffect(() => {
        if (favMovies_loaded) {
            if (inFavorite) {
                Axios.post('https://mernmoviesapp.herokuapp.com/api/movie/addFavMovie',
                    {
                        movieId: movieData.movieId,
                        movieTitle: movieData.movieTitle,
                        movieImage: movieData.movieImage,
                        moviePoster: movieData.moviePoster,
                        MovieRunTime: movieData.MovieRunTime
                    }
                ).then((response) => {

                    const favMovieItem = {
                        _id: response.data._id,
                        movieId: movieData.movieId,
                        movieTitle: movieData.movieTitle,
                        movieImage: movieData.movieImage,
                        moviePoster: movieData.moviePoster,
                        MovieRunTime: movieData.MovieRunTime
                    }

                    dispatch(addFavMovie(favMovieItem))
                }).catch(() => {
                    alert('it did not worked')
                })
            }
        }
    }, [inFavorite])


    const displayButton = () => {

        let isInFav = favMovies.find(item => item.movieId === movieId) ? true : false

        if (!isInFav) {
            return (
                <>
                    <button
                        onClick={() => setInFavorite(prevState => !prevState)}
                    >Add to Favorite <BsFillHeartFill className="add-fav__btn" /></button>
                </>
            )
        }
        else {
            return (
                <>
                    <Link to="/favorites">
                        <button>
                            Already in Favorites <BsFillHeartFill className="add-fav__btn" />
                        </button>
                    </Link>
                </>
            )
        }
    }

    return (
        displayButton()
    )
}

export default FavoriteBtn
