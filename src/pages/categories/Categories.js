import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import { getMovies, getMoviesError, moviesLoading, moviesFailed } from '../../redux/actions/categoriesActions'

import MovieItem from '../../components/movieItem/MovieItem'
import Loading from '../../components/loading/Loading'
import GoUpButton from '../../components/goUpButton/GoUpButton'

import { Element } from 'react-scroll'

import './Categories.css'

const Categories = () => {

    const dispatch = useDispatch()

    const [genres, setGenres] = useState([])
    const [pickedGenres, setPickedGenres] = useState([28])

    const [loadMorePages, setLoadMorePages] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true)

    const moviesByCategory = useSelector(state => state.categories.moviesByCategory)
    const moviesByCategory_error = useSelector(state => state.categories.moviesByCategory_error)
    const movies_loading = useSelector(state => state.categories.moviesByCategory_loading)
    const movies_failed = useSelector(state => state.categories.moviesByCategory_failed)

    const MoviesByGenreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;

    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        axios.get(genreUrl)
            .then(res => res.data.genres)
            .then(genres => setGenres([...genres]))
    }, [])

    const handleGenres = (genreId) => {
        const isInGenres = pickedGenres.find(Id => Id === genreId)
        if (isInGenres) {
            setPickedGenres([...pickedGenres.filter(Id => Id !== genreId)])
        }
        else {
            setPickedGenres([...pickedGenres, genreId])
        }
    }

    useEffect(() => {
        dispatch(moviesLoading(true))
        dispatch(getMoviesError(false))
        axios.get(MoviesByGenreUrl, { params: { page: loadMorePages, with_genres: pickedGenres } })
            .then(res => res.data.results)
            .then(results => {
                dispatch(getMovies([...results]))
                dispatch(moviesLoading(false))
            })
            .catch(e => {
                dispatch(getMoviesError(true))
                dispatch(moviesLoading(false))
            })
    }, [])

    useEffect(() => {
        dispatch(moviesLoading(true))
        dispatch(getMoviesError(false))
        axios.get(MoviesByGenreUrl, { params: { page: loadMorePages, with_genres: String(pickedGenres) } })
            .then(res => res.data)
            .then(data => {
                if (data.total_pages > 1) {
                    setHasNextPage(true)
                }
                else {
                    setHasNextPage(false)
                }
                dispatch(getMovies([...data.results]))
                dispatch(moviesLoading(false))
                if (data.results.length === 0) {
                    dispatch(moviesFailed(true))
                }
            })
            .catch(e => {
                dispatch(getMoviesError(true))
                dispatch(moviesLoading(false))
            })
    }, [pickedGenres])

    useEffect(() => {
        if (loadMorePages !== 1) {
            dispatch(moviesLoading(true))
            dispatch(moviesFailed(false))
            axios.get(MoviesByGenreUrl, { params: { page: loadMorePages, with_genres: pickedGenres } })
                .then(res => res.data.results)
                .then(results => {
                    dispatch(getMovies([...moviesByCategory, ...results]))
                    dispatch(moviesLoading(false))
                    if (results.length === 0) {
                        dispatch(moviesFailed(true))
                    }
                })
                .catch(e => {
                    dispatch(getMoviesError(true))
                    dispatch(moviesLoading(false))
                })
        }
    }, [loadMorePages])

    const handleLoadMoreMovies = () => {
        setLoadMorePages(prevState => prevState + 1)
    }

    return (
        <Element className="categories" name="categories">
            <div className="categories__buttons">
                {genres.length > 0 ? genres.map(genre => {
                    return (
                        <button
                            className={pickedGenres.includes(genre.id) ? "active" : ""}
                            onClick={() => handleGenres(genre.id)}
                            key={genre.id}
                            id={genre.id}
                        >
                            {genre.name}
                        </button>
                    )
                }) : <Loading />}
            </div>
            <div className="categories__movies">
                {moviesByCategory.length > 0 &&
                    moviesByCategory.map((movie, index) => {
                        return (
                            <MovieItem
                                key={index}
                                image={movie.poster_path && `${process.env.REACT_APP_IMAGE_URL}w500${movie.poster_path}`}
                                title={movie.title}
                                id={movie.id}
                            />
                        )
                    })
                }
            </div>
            {movies_failed && <div className="categories__movies-failed">
                <h2>We couldnt't find movies with this specific genres, sorry!</h2>
            </div>}
            {moviesByCategory_error && <div className="categories__movies-error">
                <h2>Sorry, we are not able to display movies due to error, try refreshing the page!</h2>
            </div>}
            {!movies_failed && !moviesByCategory_error ? <div className="categories__loadmore-btn-wrapper">
                {hasNextPage && <button
                    onClick={() => handleLoadMoreMovies()}
                >
                    Load more
                </button>}
            </div> : null}
            <div className="categories__loading-wrapper">
                {movies_loading && <Loading />}
            </div>
            <GoUpButton
                scrollToElementName={'categories'}
            />
        </Element>
    )
}

export default Categories
