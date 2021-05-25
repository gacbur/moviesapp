import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core/styles";

import { BsSearch } from 'react-icons/bs'

const SearchBar = ({ width, setSideDrawerShow }) => {

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

    const [movie, setMovie] = useState('')
    const [results, setResults] = useState([])
    const [movieOption, setMovieOption] = useState('');

    const history = useHistory()

    useEffect(() => {
        if (movie.length > 0) {
            const getSearchingResults = async (movie) => {
                const API = `${process.env.REACT_APP_API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movie}&language=en`
                const response = await fetch(API)
                const responseJson = await response.json()
                if (responseJson.results) {
                    setResults(responseJson.results)
                }
            }
            getSearchingResults(movie)
        }
    }, [movie])


    useEffect(() => {

        const getMovie = () => {
            if (results.length > 0) {
                if (movieOption) {
                    history.push(`/movie/${movieOption}`)
                }
                else {
                    history.push('/missing_info')
                }

                if (setSideDrawerShow) {
                    setSideDrawerShow(false)
                }
            }
        }

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
                onChange={(event, newValue) => {
                    setMovieOption(String(results.filter(movie => movie.original_title === newValue)[0].id))
                }}
                renderInput={(params) => (
                    <TextField style={{ Color: 'white' }}
                        {...params}
                        label={<p>Search for movies <BsSearch /></p>}
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
