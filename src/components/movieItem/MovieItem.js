import React from 'react'

import { Link } from 'react-router-dom'

import './MovieItem.css'

const MovieItem = ({ image, id }) => {

    return (
        <Link to={`/movie/${id}`}>
            <div className="movie-item">
                <img className="movie_item__img" src={`${image}`} alt="sdsds" />
            </div>
        </Link>
    )
}


export default MovieItem
