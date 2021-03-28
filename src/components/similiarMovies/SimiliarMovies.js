import React from 'react'

import { useSelector } from 'react-redux'

import SimiliarMovie from '../similiarMovie/SimiliarMovie'

import './SimiliarMovies.css'

const SimiliarMovies = () => {

    const similiarMovies = useSelector(state => state.movies.similiarMovies)

    return (
        <div className="similiar-movies">
            <div className="similiar-movies__content">
                <h2> You might also like...</h2>
                <div className="content__similiar-movies">
                    {similiarMovies && similiarMovies.map(item => (
                        <SimiliarMovie key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SimiliarMovies
