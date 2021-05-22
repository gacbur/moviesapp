import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import { getMovies, moviesLoading } from '../../redux/actions/categoriesActions'

import MovieItem from '../../components/movieItem/MovieItem'
import Loading from '../../components/loading/Loading'

import './Categories.css'

const Categories = () => {

    const dispatch = useDispatch()

    const [genres, setGenres] = useState([])
    const [pickedGenres, setPickedGenres] = useState([28])

    const [loadMorePages, setLoadMorePages] = useState(1)

    const moviesByCategory = useSelector(state => state.categories.moviesByCategory)
    const movies_loading = useSelector(state => state.categories.moviesByCategory_loading)

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

    // useEffect(() => {
    //     axios.get(MoviesByGenreUrl, { params: { with_genres: pickedGenres } })
    //         .then(res => res.data)
    //         .then(data => console.log(data))
    // }, [pickedGenres])


    useEffect(() => {
        console.log(pickedGenres)
        dispatch(moviesLoading(true))
        axios.get(MoviesByGenreUrl, { params: { page: loadMorePages, with_genres: String(pickedGenres) } })
            .then(res => res.data.results)
            .then(results => {
                dispatch(getMovies([...results]))
                dispatch(moviesLoading(false))
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        console.log(pickedGenres)
        dispatch(moviesLoading(true))
        axios.get(MoviesByGenreUrl, { params: { page: loadMorePages, with_genres: String(pickedGenres) } })
            .then(res => res.data.results)
            .then(results => {
                dispatch(getMovies([...results]))
                dispatch(moviesLoading(false))
            })
            .catch(e => {
                console.log(e)
            })
    }, [pickedGenres])

    useEffect(() => {
        if (loadMorePages !== 1) {
            dispatch(moviesLoading(true))
            axios.get(MoviesByGenreUrl, { params: { page: loadMorePages, with_genres: pickedGenres } })
                .then(res => res.data.results)
                .then(results => {
                    dispatch(getMovies([...moviesByCategory, ...results]))
                    dispatch(moviesLoading(false))
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }, [loadMorePages])

    const handleLoadMoreMovies = () => {
        setLoadMorePages(prevState => prevState + 1)
    }

    return (
        <div className="categories">
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
                }) : 'loading'}
            </div>
            <div className="categories__movies">
                {moviesByCategory.length > 0 &&
                    moviesByCategory.map((movie, index) => {
                        return (
                            <MovieItem
                                key={index}
                                image={movie.poster_path && `${process.env.REACT_APP_IMAGE_URL}w500${movie.poster_path}`}
                                id={movie.id}
                            />
                        )
                    })
                }

            </div>
            <div className="categories__loadmore-btn-wrapper">
                <button
                    onClick={() => handleLoadMoreMovies()}
                >
                    Load more
                </button>
                { }
            </div>
            <div className="categories__loading-wrapper">
                {movies_loading && <Loading />}
            </div>
        </div>
    )
}

export default Categories
