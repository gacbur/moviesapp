import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { useHistory } from 'react-router'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import "./MoviesCarousel.css"

const MoviesCarousel = () => {


    const [movies, setMovies] = useState([])
    const [startingMovie, setStartingMovie] = useState(0)

    const history = useHistory()

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            .then(res => res.data.results)
            .then(movies => {
                setMovies(
                    movies.map(movie => {
                        return {
                            id: movie.id,
                            imageUrl: movie.backdrop_path,
                            title: movie.title,
                            overview: movie.overview
                        }
                    })
                )
            })
    }, [])

    useEffect(() => {
        console.log(movies)
    }, [movies])

    useEffect(() => {
        const startCarousel = () => {
            setTimeout(() => {
                setStartingMovie(1)
            }, 5000)
        }

        if (movies.length > 0) {
            startCarousel()
        }
    }, [movies])


    const handleGoToMovie = (index) => {
        const projectItemId = movies[index].id
        setStartingMovie(projectItemId)
        history.push(`/movie/${projectItemId}`)
    }


    return (
        <>
            {movies.length > 0 && <div className='movies-carousel'>
                <Carousel
                    className="carousel"
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    showArrows={false}
                    selectedItem={startingMovie}
                    showStatus={false}
                    showThumbs={false}
                    stopOnHover
                    onClickItem={(index) => handleGoToMovie(index)}
                >
                    {movies.map(movie => {
                        return (
                            <div className="carousel__item-cnt" key={movie.id}>
                                <div className="carousel__item" style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}w1280${movie.imageUrl})` }}>
                                </div>
                                <div className="img-overlay">
                                    <h2>
                                        {movie.title}
                                    </h2>
                                    <p>
                                        {movie.overview.length > 200 ? `${movie.overview.slice(0, 200)}...` : movie.overview}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>
            </div>}
            { movies.length < 0 && <div className="movies-carousel-loading">
                Loading
            </div>}
        </>
    )
}

export default MoviesCarousel
