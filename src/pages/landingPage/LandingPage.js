import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import MoviesCarousel from '../../components/moviesCarousel/MoviesCarousel'
import MainImage from '../../components/mainImage/MainImage'
import MovieItem from '../../components/movieItem/MovieItem'
import Loading from '../../components/loading/Loading'

import { getMovies, resetSingleMovie } from '../../redux/actions/moviesActions'

import { useDispatch, useSelector } from 'react-redux'

import './LandingPage.css'

const LandingPage = () => {

    const dispatch = useDispatch()

    const movies = useSelector(state => state.movies.movies)
    const movies_loaded = useSelector(state => state.movies.movies_loaded)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const path = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        fetchMovies(path)
    }, [])

    const fetchMovies = (endpoint) => {

        Axios.get(endpoint)
            .then(response => {
                let tempMovies = [...movies, ...response.data.results]
                const originalMovies = [...new Map(tempMovies.map(item => [item['popularity'], item])).values()]
                dispatch(getMovies(originalMovies))
                setCurrentPage(response.data.page)
            })
        dispatch(resetSingleMovie())
    }

    const handleLoadMoreMovies = () => {
        const path = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage + 1}`
        fetchMovies(path)
    }

    return (
        <>
            <div className="movies-carousel-cnt">
                {movies_loaded ? <MoviesCarousel /> : null}
            </div>
            {
                movies_loaded ?
                    <div className="landing-page">
                        <h1>Popular movies</h1>
                        <div className="landing-page__movies">
                            {movies.map((item, key) => {
                                return (
                                    <MovieItem
                                        key={key}
                                        image={item.poster_path && `${process.env.REACT_APP_IMAGE_URL}w500${item.poster_path}`}
                                        id={item.id}
                                    />
                                )
                            })
                            }

                        </div>
                        <div className="landing-page__load-more">
                            <button
                                onClick={() => handleLoadMoreMovies()}
                            >
                                Load more</button>
                        </div>
                    </div>
                    :
                    <div className="landing-page__loading">
                        <Loading />
                    </div>
            }
        </>
    )
}

export default LandingPage
