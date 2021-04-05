import React, { useEffect, useState } from 'react'
import Axios from 'axios'

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

    const [mainImage_index, setMainImage_index] = useState(0)

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

    useEffect(() => {
        if (movies_loaded) {
            setMainImage_index(Math.floor(Math.random() * movies.length))
        }

    }, [movies_loaded, movies.length])

    return (
        <>
            <div className="main-image-cnt">
                {
                    movies_loaded ? <MainImage
                        image={`${process.env.REACT_APP_IMAGE_URL}w1280${movies[mainImage_index].backdrop_path}`}
                        title={movies[mainImage_index].title}
                        id={movies[mainImage_index].id}
                    /> : null
                }
            </div>
            <div className="landing-page">
                <h1>Popular movies</h1>
                <div className="landing-page__movies">
                    {
                        movies_loaded
                            ?
                            movies.map((item, key) => {
                                return (
                                    <MovieItem
                                        key={key}
                                        image={item.poster_path && `${process.env.REACT_APP_IMAGE_URL}w500${item.poster_path}`}
                                        id={item.id}
                                    />
                                )
                            })
                            :
                            <div className="landing-page__loading">
                                <Loading />
                            </div>
                    }

                </div>
                <div className="landing-page__load-more">
                    <button
                        onClick={() => handleLoadMoreMovies()}
                    >
                        Load more</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
