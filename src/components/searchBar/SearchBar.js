import React, { useState, useEffect } from 'react'

import Axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { getSingleMovie } from '../../redux/actions/singleMovieActions'

import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core/styles";

import { BsSearch } from 'react-icons/bs'

const SearchBar = ({ width, setSideDrawerShow }) => {

    const [movie, setMovie] = useState('')
    const [results, setResults] = useState([])
    const [movieOption, setMovieOption] = useState('');

    const dispatch = useDispatch()
    const history = useHistory()

    const singleMovieCurrentID = useSelector(state => state.singleMovie.singleMovie.id)
    const movies_loaded = useSelector(state => state.movies.movies_loaded)

    useEffect(() => {
        if (movie.length > 0) {
            const getSearchingResults = async (movie) => {
                const API = `${process.env.REACT_APP_API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movie}`
                const response = await fetch(API)
                const responseJson = await response.json()
                if (responseJson.results) {
                    setResults(responseJson.results)
                }
            }
            getSearchingResults(movie)
        }
    }, [movie])


    const useStyles = makeStyles({
        inputRoot: {
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                Color: 'white'
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
                Color: 'white'
            },
        }
    })

    const classes = useStyles();

    const searchPlaceholder = () => {
        return <p>Search for movies <BsSearch /> </p>
    }

    const getMovie = () => {
        if (movies_loaded) {
            const singleMovie = results.filter(item => item.title === movieOption)
            const singleMovieID = singleMovie.map(item => item.id)

            Axios.get(`${process.env.REACT_APP_API_URL}movie/${singleMovieID.length > 0 ? singleMovieID : singleMovieCurrentID}?api_key=${process.env.REACT_APP_API_KEY}`)
                .then(response => response.data)
                .then(data => {
                    dispatch(getSingleMovie(data))
                }).catch(err => {
                    console.log(err)
                })

            if (singleMovieID.length !== 0) {
                history.push(`/movie/${singleMovieID}`)
            }
            else {
                history.push(`/movie/${singleMovieCurrentID}`)
            }
            if (setSideDrawerShow) {
                setSideDrawerShow(false)
            }
        }
    }

    useEffect(() => {
        getMovie()
    }, [movieOption])

    return (
        <div className="search-bar">
            <Autocomplete
                style={{ width, Color: "white" }}
                freeSolo
                classes={classes}
                id="free-solo-2-demo"
                disableClearable
                options={results.map(item => item.original_title)}
                value={movieOption}
                onChange={(event, newValue) => setMovieOption(newValue)}
                renderInput={(params) => (
                    <TextField style={{ Color: 'white' }}
                        {...params}
                        label={searchPlaceholder()}
                        margin="normal"
                        variant="outlined"
                        value={movie}
                        onChange={(e) => setMovie(e.target.value)}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    )
}

export default SearchBar
