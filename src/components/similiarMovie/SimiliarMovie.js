import React from 'react'

import { Link } from 'react-router-dom'

import './SimiliarMovie.css'

const SimiliarMovie = ({ item }) => {
    return (
        <Link className="similiar-movies__item-link" to={`/movie/${item.id}`}>
            <div className="similiar-movies__link-item">
                <img src={`${process.env.REACT_APP_IMAGE_URL}w500${item.poster_path}`} alt={`${item.title}`} />
            </div>
        </Link>
    )
}

export default SimiliarMovie
