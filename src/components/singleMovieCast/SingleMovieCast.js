import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import MovieCastItem from '../movieCastItem/MovieCastItem'

import './SingleMovieCast.css'

const SingleMovieCast = () => {

    const cast = useSelector(state => state.movies.singleMovie_cast)

    const [maxCastLength, setMaxCastLength] = useState(0)
    const [currentCast, setCurrentCast] = useState()
    const [toggleCast, setToggleCast] = useState(false)
    const [loadMoreVisible, setLoadMoreVisible] = useState(false)

    useEffect(() => {
        setToggleCast(false)
        setMaxCastLength(20)
    }, [cast])

    useEffect(() => {
        if (maxCastLength > 0 && cast.length > maxCastLength) {
            setLoadMoreVisible(true)
        }
        else if (cast.length < maxCastLength) {
            setLoadMoreVisible(false)
        }
        const initialCast = cast.slice(0, maxCastLength)
        setCurrentCast(initialCast)
    }, [cast, maxCastLength, loadMoreVisible])

    const loadMoreCast = () => {
        if (maxCastLength < cast.length) {
            setMaxCastLength(prevState => prevState + 20)
        }
    }

    return (
        <>
            <button
                onClick={() => setToggleCast(prevState => !prevState)}
                className="movie-cast__toggle-btn"
            >
                Toggle Cast View
                </button>
            <div className={`single-movie-cast ${toggleCast ? '' : 'hide'}`}>
                <h2>Cast ({cast.length})</h2>
                <div className="movie-cast__content">
                    {currentCast ? currentCast.map(item => (
                        <MovieCastItem key={item.credit_id} item={item} />
                    ))
                        :
                        <h2>Loading...</h2>
                    }
                </div>
                {<button
                    onClick={() => loadMoreCast()}
                    className={`load-more ${loadMoreVisible ? '' : 'hide'}`}

                >
                    Load more
                    </button>}
            </div>
        </>
    )
}

export default SingleMovieCast
