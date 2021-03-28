import React from 'react'

import './MovieCastItem.css'

const MovieCastItem = ({ item }) => {
    return (
        <>
            <div className="movie-cast-item">
                <img src={`${process.env.REACT_APP_IMAGE_URL}w500${item.profile_path}`} alt={`${item.original_name}`} />
                <div className="movie-cast-item-overlay">
                    <h4>{item.name} <strong>As:</strong></h4>
                    <p> "{item.character}"</p>
                </div>
            </div>
        </>
    )
}

export default MovieCastItem
