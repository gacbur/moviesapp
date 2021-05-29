import React from 'react'

import { Link } from 'react-router-dom'

import MovieRatingIcon from '../movieRatingIcon/MovieRatingIcon'


import './SimiliarMovie.css'

const SimiliarMovie = ({ item }) => {
    return (
        <div className="similiar-movie">
            <Link to={`/movie/${item.id}`}>
                <img src={item.poster_path !== null ? `${process.env.REACT_APP_IMAGE_URL}w500${item.poster_path}` : '/images/poster_not_available.png'} alt={`${item.title}`} />
                <div className="similiar-movie__overlay">
                    <h5>
                        {item.title}
                    </h5>
                    <MovieRatingIcon vote_average={item.vote_average} />
                </div>
            </Link>
        </div>
    )
}

export default SimiliarMovie
