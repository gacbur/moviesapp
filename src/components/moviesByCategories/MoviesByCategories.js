import React, { useEffect, useState } from 'react'

import axios from 'axios'

import MoviesByCategoriesBtns from '../moviesByCategoriesBtns/MoviesByCategoriesBtns'
import MovieItem from '../movieItem/MovieItem'
import Loading from '../loading/Loading'

import { getMovies, moviesLoading } from '../../redux/actions/moviesActions'

import { useSelector, useDispatch } from 'react-redux'

import "./MoviesByCategories.css"


const MoviesByCategories = () => {

    const dispatch = useDispatch()

    const movies = useSelector(state => state.movies.movies)
    const movies_loaded = useSelector(state => state.movies.movies_loaded)

    const [category, setCategory] = useState('now_playing')
    const [page, setPage] = useState(1)

    useEffect(() => {
        const API_URL = `${process.env.REACT_APP_API_URL}movie/${category}?api_key=${process.env.REACT_APP_API_KEY}`

        const fetchData = async () => {
            dispatch(moviesLoading(true))
            try {
                const moviesData = await axios.get(API_URL, { params: { language: 'en-US', page: page } })
                const results = await moviesData.data.results
                dispatch(getMovies([...results]))
                dispatch(moviesLoading(false))
            } catch (e) { console.log(e) }
        }
        fetchData()
    }, [category])

    useEffect(() => {
        const API_URL = `${process.env.REACT_APP_API_URL}movie/${category}?api_key=${process.env.REACT_APP_API_KEY}`

        const fetchData = async () => {
            dispatch(moviesLoading(true))
            try {
                const moviesData = await axios.get(API_URL, { params: { language: 'en-US', page: page } })
                const results = await moviesData.data.results
                dispatch(getMovies([...movies, ...results]))
                dispatch(moviesLoading(false))
            } catch (e) { console.log(e) }
        }
        if (page !== 1) fetchData()
    }, [page])


    return (
        <>
            <MoviesByCategoriesBtns
                setCategory={setCategory}
                category={category}
            />
            <div className="landing-page__loading-movies">
                {movies_loaded && <Loading size={90} />}
            </div>
            <div className="landing-page__movies">
                {!movies_loaded && movies.map((item, index) => {
                    return (
                        <MovieItem
                            key={index}
                            image={item.poster_path && `${process.env.REACT_APP_IMAGE_URL}w500${item.poster_path}`}
                            title={item.title}
                            vote_average={item.vote_average}
                            id={item.id}
                        />
                    )
                })}
            </div>
            <div className="landing-page__load-more">
                <button
                    onClick={() => setPage(prevState => prevState + 1)}
                >
                    Load more</button>
            </div>

        </>
    )
}

export default MoviesByCategories
