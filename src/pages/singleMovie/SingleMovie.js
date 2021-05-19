import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import MainImage from '../../components/mainImage/MainImage'
import FavoriteBtn from '../../components/favoriteBtn/FavoriteBtn'
import SimiliarMovies from '../../components/similiarMovies/SimiliarMovies'
import SingleMovieGallery from '../../components/singleMovieGallery/SingleMovieGallery'
import SingleMovieCast from '../../components/singleMovieCast/SingleMovieCast'
import SingleMovieCrew from '../../components/singleMovieCrew/SingleMovieCrew'
import Loading from '../../components/loading/Loading'

import { useDispatch, useSelector } from 'react-redux'

import { getSingleMovie, singleMovieLoading, getSimiliarMovies, getSingleMovieGallery, getSingleMovieCrewAndCast } from '../../redux/actions/singleMovieActions'

import './SingleMovie.css'

const SingleMovie = (props) => {

    const dispatch = useDispatch()

    const singleMovieId = props.match.params.id

    const [ratingColor, setRatingColor] = useState()

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

    const singleMovie = useSelector(state => state.singleMovie.singleMovie)
    const singleMovie_loading = useSelector(state => state.singleMovie.singleMovie_loading)

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

    return (
        <>
            {
                !singleMovie_loading ?
                    <>
                        <div className="single-movie__main-image">
                            <MainImage image={`${process.env.REACT_APP_IMAGE_URL}w1280${backdrop_path}`} />
                        </div>
                        <div className="single-movie">
                            <div className="single-movie__add-fav">
                                <h1>{title}</h1>
                                <FavoriteBtn
                                    movieId={singleMovieId}
                                    movieTitle={title}
                                    moviePoster={poster_path}
                                />
                            </div>
                            <div className="single-movie__full-description">
                                <div className="full-description__img">
                                    <img src={backdrop_path && `${process.env.REACT_APP_IMAGE_URL}w500${poster_path}`} alt={`${title}`} />
                                </div>
                                <div className="full-description__desc">
                                    <p><strong>Description: </strong>{overview}</p>
                                    <p><strong>Original language: </strong>{original_language}</p>
                                    <p><strong>Release date: </strong>{release_date}</p>
                                    <p><strong>Status: </strong>{status}</p>
                                    <div className="desc__avg-rating"><span><strong>Average Rating: </strong><div style={{ backgroundColor: ratingColor }} className="avg-rating__icon">{vote_average}</div></span></div>
                                    <p><strong>Genre: </strong>{genres ? genres[0].name : 'no data... Sorry'}</p>
                                    <p><strong>Age: </strong>{adult ? '18+' : 'below 18'}</p>
                                </div>
                            </div>
                            <SingleMovieGallery />
                            <SingleMovieCast />
                            <SingleMovieCrew />
                            <SimiliarMovies />
                        </div>
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
