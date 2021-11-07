import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'

import { useHistory } from 'react-router-dom'

import SearchResultItem from '../searchResultItem/SearchResultItem';
import Loading from '../loading/Loading';

import { BsSearch } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'

import "./SearchBar.css"

const SearchBar = () => {

    const [movie, setMovie] = useState('')
    const [results, setResults] = useState([])
    const [resultsLoading, setResultsLoading] = useState(false)
    const [resultsError, setResultsError] = useState(false)
    const [resultsErrorMsg, setResultsErrorMsg] = useState('')

    const history = useHistory()

    const searchInput = useRef(null)

    const handleFocusOnInput = (e) => {
        if (e.currentTarget.id === 'cancel-results') {
            setMovie('')
            setResults([])
        }
        searchInput.current.focus()
    }

    useEffect(() => {
        const source = axios.CancelToken.source()

        const getSearchingResults = async (movie) => {
            setResultsLoading(true)
            setResultsError(false)
            setTimeout(async () => {
                try {
                    const API = `${process.env.REACT_APP_API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movie}&language=en`
                    const response = await axios.get(API, {
                        cancelToken: source.token
                    })
                    const results = await response.data.results
                    console.log(results)
                    setResults(results)
                    setResultsLoading(false)
                    if (results.length <= 0) {
                        setResultsErrorMsg("No results found for this title...")
                    }
                } catch (err) {
                    setResults([])

                    if (axios.isCancel(err)) {
                        setResultsLoading(false)
                    }
                }
            }, 350)
        }

        if (movie.length > 0) getSearchingResults(movie)

        return () => {
            source.cancel()
        }
    }, [movie])

    useEffect(() => { movie.length < 1 && setResults([]) }, [movie])

    useEffect(() => {
        return history.listen(() => {
            setMovie('')
            setResults([])
        })
    }, [history])

    return (
        <div className="search-bar">
            <div
                className="search-bar__input-wrapper"
                type="text"
            >
                <input
                    className="search-bar__input"
                    placeholder="Search for movies..."
                    type="text"
                    ref={searchInput}
                    value={movie}
                    onChange={(e) => {
                        setMovie(e.target.value)
                        console.log(movie)
                    }}
                >
                </input>
                <span
                    className="search-bar__icon-cnt"
                >
                    {
                        resultsLoading ?
                            <div
                                className="search-bar__icon"
                                id="loading"
                                onClick={(e) => handleFocusOnInput(e)}
                            >
                                <Loading size={22} color={'gray'} />
                            </div>
                            :
                            null
                    }
                    {
                        !resultsLoading && results.length > 0 ?
                            <div
                                className="search-bar__icon search-bar__icon--cancel"
                                id="cancel-results"
                                onClick={(e) => handleFocusOnInput(e)}
                            >
                                <IoCloseSharp />
                            </div>
                            :
                            null
                    }
                    {
                        !resultsLoading && results.length <= 0 ?
                            <div
                                className="search-bar__icon"
                                id="search"
                                onClick={(e) => handleFocusOnInput(e)}
                            >
                                <BsSearch />
                            </div>
                            :
                            null
                    }
                </span>
            </div>
            <div className="search-bar__results">
                {resultsError && results.length <= 0 && movie.length > 0 ?
                    <div className="search-bar__results-error">
                        {resultsErrorMsg}
                    </div>
                    :
                    results.map(result => {
                        return <SearchResultItem movie={result} key={result.id} />
                    })
                }
            </div>
        </div>
    )
}

export default SearchBar