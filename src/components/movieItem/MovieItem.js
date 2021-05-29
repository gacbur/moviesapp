import React from 'react'

import { Link } from 'react-router-dom'

import MovieRatingIcon from '../movieRatingIcon/MovieRatingIcon'

import './MovieItem.css'

const MovieItem = ({ image, title, vote_average, id }) => {

    return (
        <div className="movie-item">
            <Link to={`/movie/${id}`}>
                <img className="movie-item__img" src={`${image || '/images/poster_not_available.png'}`} alt={`${title}`} />
                <div className="movie-item__overlay">
                    <h5>
                        {title}
                    </h5>
                    <MovieRatingIcon vote_average={vote_average} />
                </div>
            </Link>
        </div>
    )
}


export default MovieItem
