import React from 'react'

import './MovieCrewItem.css'


const MovieCrewItem = ({ item }) => {
    return (
        <>
            <div className="movie-crew-item">
                <img src={`${process.env.REACT_APP_IMAGE_URL}w500${item.profile_path}`} alt={`${item.original_name}`} />
                <div className="movie-crew-item-overlay">
                    <h4>{item.name} <strong>Job:</strong></h4>
                    <p> "{item.job}"</p>
                </div>
            </div>
        </>
    )
}

export default MovieCrewItem
