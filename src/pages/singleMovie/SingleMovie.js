import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router'

import { getSingleMovie, singleMovieLoading, getSimiliarMovies, getSingleMovieGallery, getSingleMovieCrewAndCast } from '../../redux/actions/singleMovieActions'
import { pickGenres } from '../../redux/actions/categoriesActions'

import { Element } from 'react-scroll'

import MainImage from '../../components/mainImage/MainImage'
import FavoriteBtn from '../../components/favoriteBtn/FavoriteBtn'
import SimiliarMovies from '../../components/similiarMovies/SimiliarMovies'
import SingleMovieGallery from '../../components/singleMovieGallery/SingleMovieGallery'
import SingleMovieCast from '../../components/singleMovieCast/SingleMovieCast'
import SingleMovieCrew from '../../components/singleMovieCrew/SingleMovieCrew'
import Loading from '../../components/loading/Loading'
import GoUpButton from '../../components/goUpButton/GoUpButton'

import './SingleMovie.css'

const SingleMovie = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const singleMovieId = props.match.params.id

    const [ratingColor, setRatingColor] = useState()

    const singleMovie = useSelector(state => state.singleMovie.singleMovie)
    const singleMovie_loading = useSelector(state => state.singleMovie.singleMovie_loading)

    useEffect(() => {

        dispatch(singleMovieLoading(true))
        Axios.get(`${process.env.REACT_APP_API_URL}movie/${singleMovieId}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data)
            .then(movieItem => {
                dispatch(getSingleMovie(movieItem))
                dispatch(singleMovieLoading(false))
            }).catch(err =>
                console.log("Failed getting single movie item" + err)
            )

        dispatch(singleMovieLoading(true))
        Axios.get(`${process.env.REACT_APP_API_URL}/movie/${singleMovieId}/images?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data.backdrops)
            .then(galleryItems => {
                dispatch(getSingleMovieGallery(galleryItems))
                dispatch(singleMovieLoading(false))
            }).catch(err =>
                console.log("Failed getting single movie item" + err)
            )

        dispatch(singleMovieLoading(true))
        Axios.get(`${process.env.REACT_APP_API_URL}movie/${singleMovieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data)
            .then(results => {
                dispatch(getSingleMovieCrewAndCast(results.crew, results.cast))
                dispatch(singleMovieLoading(false))
            }).catch(err =>
                console.log("Failed getting single movie item" + err)
            )

        dispatch(singleMovieLoading(true))
        Axios.get(`${process.env.REACT_APP_API_URL}movie/${singleMovieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data.results)
            .then(results => {
                let tempResults = results
                tempResults = tempResults.slice(0, 3)
                dispatch(getSimiliarMovies(tempResults))
                dispatch(singleMovieLoading(false))
            }).catch(err =>
                console.log("Failed getting single movie item" + err)
            )
    }, [singleMovieId, dispatch])

    const {
        adult,
        title,
        overview,
        original_language,
        poster_path,
        release_date,
        status,
        vote_average,
        backdrop_path,
        genres
    } = singleMovie

    useEffect(() => {
        const getRatingColor = () => {
            if (vote_average > 0 && vote_average <= 2.5) {
                setRatingColor("#d6544b")
            }
            else if (vote_average > 2.5 && vote_average <= 5) {
                setRatingColor("#ffa929")
            }
            else if (vote_average > 5 && vote_average <= 6.8) {
                setRatingColor("#d4cd55")
            }
            else if (vote_average > 6.8 && vote_average <= 10) {
                setRatingColor("#3ed664")
            }
        }
        getRatingColor()
    }, [singleMovie_loading, vote_average])

    const handleGoToCategories = async (genreId) => {
        history.push('/categories')
        dispatch(pickGenres([genreId]))
    }


    return (
        <>
            {
                !singleMovie_loading ?
                    <>
                        <div className="single-movie-main-image">
                            <MainImage image={backdrop_path !== null ? `${process.env.REACT_APP_IMAGE_URL}w1280${backdrop_path}` : '/images/image_not_available.png'} />
                        </div>
                        <Element className="single-movie" name="single-movie">
                            <div className="single-movie__add-fav">
                                <h1>{title}</h1>
                                <FavoriteBtn
                                    movieId={singleMovieId}
                                    movieTitle={title}
                                    moviePoster={poster_path}
                                />
                            </div>
                            <div className="single-movie__full-description">
                                <div className="img">
                                    <img src={poster_path !== null ? `${process.env.REACT_APP_IMAGE_URL}w500${poster_path}` : '/images/poster_not_available.png'} alt={`${title}`} />
                                </div>
                                {<div className="desc">
                                    <p><strong>Description: </strong>{overview ? overview : 'no data... Sorry'}</p>
                                    <p><strong>Original language: </strong>{original_language}</p>
                                    <p><strong>Release date: </strong>{release_date}</p>
                                    <p><strong>Status: </strong>{status}</p>
                                    <div className="rating"><span><strong>Average Rating: </strong><div style={{ backgroundColor: ratingColor }} className="rating-icon">{vote_average}</div></span></div>
                                    <p><strong>Age: </strong>{adult ? '18+' : 'below 18'}</p>
                                    <div className="genres-wrapper">
                                        <p>genres:</p>
                                        {genres ?
                                            genres.map((genre) => {
                                                return (
                                                    <button
                                                        key={genre.id}
                                                        onClick={() => handleGoToCategories(genre.id)}
                                                    >
                                                        {genre.name}
                                                    </button>
                                                )
                                            }) : <p>'no data... Sorry'</p>}
                                    </div>
                                </div>}
                            </div>
                            <SingleMovieGallery />
                            <SingleMovieCast />
                            <SingleMovieCrew />
                            <SimiliarMovies />
                            <GoUpButton
                                scrollToElementName={'single-movie'}
                            />
                        </Element>
                    </>
                    :
                    <div className="single-movie__loading">
                        <Loading />
                    </div>
            }
        </>
    )
}

export default SingleMovie
