import React from 'react'

import { useHistory } from 'react-router'

import './MovieMissingInfo.css'

const MovieMissingInfo = () => {

    const history = useHistory()

    return (
        <div className="movie-missing-info">
            <h2>This movie is missing some information so we couldn't display it for you, sorry!</h2>
            <button
                onClick={() => history.goBack()}
                className="movie-missing-info__go-back-btn">
                Go back
            </button>
        </div>
    )
}

export default MovieMissingInfo
