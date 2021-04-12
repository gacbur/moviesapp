import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { addFavMovie, removeFromFavorite } from '../../redux/actions/favMoviesActions'

import { BsFillHeartFill } from 'react-icons/bs'


const FavoriteBtn = ({ movieId, movieTitle, moviePoster }) => {

    const dispatch = useDispatch()

    const favMovies = useSelector(state => state.favMovies.favMovies)

    const [inFavorite, setInFavorite] = useState(false)

    useEffect(() => {
        const checkIfFavorited = () => {
            const isInFavorite = favMovies.find(item => item.movieId === movieId)
            if (isInFavorite) {
                setInFavorite(true)
            } else {
                setInFavorite(false)
            }
        }
        checkIfFavorited()
    }, [movieId, favMovies])

    const handleAddToFavorite = () => {
        if (!inFavorite) {
            dispatch(addFavMovie({
                movieId,
                movieTitle,
                moviePoster
            }))
            setInFavorite(true)
        }
        else {
            dispatch(removeFromFavorite(movieId))
            setInFavorite(false)
        }
    }

    return (
        <button
            onClick={() => handleAddToFavorite()}
        >
            {inFavorite ? 'Unfavorite' : 'Add to favorite'} <BsFillHeartFill className="add-fav__btn" />
        </button>
    )
}

export default FavoriteBtn
