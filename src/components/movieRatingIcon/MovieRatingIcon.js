import React, { useEffect, useState } from 'react'

import './MovieRatingIcon.css'

const MovieRatingIcon = ({ vote_average }) => {

    const [ratingColor, setRatingColor] = useState()

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
    }, [vote_average])

    return (
        <div className="movie-rating-icon" style={{ backgroundColor: `${ratingColor && ratingColor}` }}>
            <p className="movie-rating-icon__number">{vote_average.toFixed(1)}</p>
        </div>
    )
}

export default MovieRatingIcon
