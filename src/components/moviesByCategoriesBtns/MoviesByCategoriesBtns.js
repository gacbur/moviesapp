import React from 'react'

import "./MoviesByCategoriesBtns.css"

const MoviesByCategoriesBtns = ({ setCategory, category }) => {
    return (
        <div className="landing-page__category-btns">
            <button
                name="now_playing"
                onClick={(e) => setCategory(e.target.name)}
                className={category === "now_playing" ? 'active' : ''}
            >
                Now Playing
            </button>
            <button
                name="popular"
                onClick={(e) => setCategory(e.target.name)}
                className={category === "popular" ? 'active' : ''}
            >
                Popular
            </button>
            <button
                name="top_rated"
                onClick={(e) => setCategory(e.target.name)}
                className={category === "top_rated" ? 'active' : ''}
            >
                Top Rated
            </button>
            <button
                name="upcoming"
                onClick={(e) => setCategory(e.target.name)}
                className={category === "upcoming" ? 'active' : ''}
            >
                Upcoming
            </button>
        </div>
    )
}

export default MoviesByCategoriesBtns
