import React from 'react'

import { useHistory } from 'react-router-dom'

import './SearchResultItem.css'

const SearchResultItem = ({ movie }) => {

    const { id, title, original_title, poster_path } = movie

    const history = useHistory()

    const handleGoToMovie = (id) => {
        history.push(`/movie/${id}`)
    }

    return (
        <div
            className="search-result-item"
            onClick={() => handleGoToMovie(id)}
        >
            <div className="search-result-item__poster-cnt">
                <img
                    className="search-result-item__poster"
                    alt={title}
                    src={poster_path !== null ? `${process.env.REACT_APP_IMAGE_URL}w500${poster_path}` : '/images/poster_not_available.png'}
                />
            </div>
            <div className="search-result-item__titles-cnt">
                <h3 className="search-result-item__title-eng">
                    {title}

                </h3>
                {title === original_title ? null
                    :
                    <h3 className="search-result-item__title-original">
                        {original_title}
                    </h3>}
            </div>

        </div>
    )
}

export default SearchResultItem
