import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import MovieCrewItem from '../movieCrewItem/MovieCrewItem'

import './SingleMovieCrew.css'

const SingleMovieCrew = () => {

    const crew = useSelector(state => state.singleMovie.singleMovie_crew)

    const [maxCrewLength, setMaxCrewLength] = useState(0)
    const [currentCrew, setCurrentCrew] = useState()
    const [toggleCrew, setToggleCrew] = useState(false)
    const [loadMoreVisible, setLoadMoreVisible] = useState(false)

    useEffect(() => {
        setToggleCrew(false)
        setMaxCrewLength(20)
    }, [crew])

    useEffect(() => {
        if (maxCrewLength > 0 && crew.length > maxCrewLength) {
            setLoadMoreVisible(true)
        }
        else if (crew.length < maxCrewLength) {
            setLoadMoreVisible(false)
        }
        const initialCrew = crew.slice(0, maxCrewLength)
        setCurrentCrew(initialCrew)
    }, [crew, maxCrewLength, loadMoreVisible])

    const loadMoreCrew = () => {
        if (maxCrewLength < crew.length) {
            setMaxCrewLength(prevState => prevState + 20)
        }
    }

    return (
        <>
            <button
                onClick={() => setToggleCrew(prevState => !prevState)}
                className="movie-crew__toggle-btn"
            >
                Toggle Crew View
                </button>
            <div className={`single-movie-crew ${toggleCrew ? '' : 'hide'}`}>
                <h2>Crew ({crew.length})</h2>
                <div className="movie-crew__content">
                    {currentCrew ? currentCrew.map(item => (
                        <MovieCrewItem key={item.credit_id} item={item} />
                    ))
                        :
                        <h2>Loading...</h2>
                    }
                </div>
                {<button
                    onClick={() => loadMoreCrew()}
                    className={`load-more ${loadMoreVisible ? '' : 'hide'}`}

                >
                    Load more
                    </button>}
            </div>
        </>
    )
}

export default SingleMovieCrew
