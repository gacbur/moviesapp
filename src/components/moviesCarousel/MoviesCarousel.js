import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { useHistory } from 'react-router'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import ClipLoader from 'react-spinners/ClipLoader'

import "./MoviesCarousel.css"

const MoviesCarousel = () => {


    const [movies, setMovies] = useState([])
    const [startingMovie, setStartingMovie] = useState(0)

    const history = useHistory()

    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await axios.get(`${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                const results = movies.data.results
                setMovies(
                    results.map(movie => {
                        return {
                            id: movie.id,
                            imageUrl: movie.backdrop_path,
                            title: movie.title,
                            overview: movie.overview
                        }
                    })
                )
            } catch (e) { console.log(e) }
        }
        getMovies()
    }, [])

    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                setStartingMovie(1)
            }
        }, 5000)

        return () => {
            mounted = false
        }
    }, [])

    const handleGoToMovie = (index) => {
        const projectItemId = movies[index].id
        setStartingMovie(projectItemId)
        history.push(`/movie/${projectItemId}`)
    }

    return (
        <>
            <div className='movies-carousel'>
                {movies.length > 0 ?
                    <Carousel
                        className="carousel"
                        autoPlay
                        infiniteLoop
                        interval={5000}
                        showArrows
                        selectedItem={startingMovie}
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                        stopOnHover
                    >
                        {movies.map((movie, index) => {
                            return (
                                <div
                                    className="carousel__item-cnt"
                                    key={movie.id}
                                >
                                    <div
                                        onClick={() => handleGoToMovie(index)}
                                        className="carousel__item" style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}w1280${movie.imageUrl})` }}>
                                    </div>
                                    <div className="img-overlay">
                                        <h2>
                                            {movie.title}
                                        </h2>
                                        <p>
                                            {movie.overview.length > 180 ? `${movie.overview.slice(0, 180)}...` : movie.overview}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </Carousel>
                    :
                    <>
                        <div className="carousel__item-loading">
                            <ClipLoader className="loader" size={90} color="#ffffff" />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default MoviesCarousel
