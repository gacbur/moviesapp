import React from 'react';

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { removeFromFavorite } from '../../redux/actions/favMoviesActions'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './Favorites.css'

const Favorites = () => {

    const favMovies = useSelector(state => state.favMovies.favMovies)

    const dispatch = useDispatch()

    const handleDeleteFavMovie = (id) => {
        dispatch(removeFromFavorite(id))
    }

    return (
        <div className="favorites">
            <div className="favorites__content">
                {favMovies.length > 0 ?
                    <TableContainer className="favorites__table-cnt" component={Paper}>
                        <Table className="favorites__table" aria-label="simple table">
                            <TableHead>
                                <TableRow className="favorites__table-row">
                                    <TableCell className="cell"><p>Movie Name</p></TableCell>
                                    <TableCell align="right"><p>Poster</p></TableCell>
                                    <TableCell align="right"><p>Action</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favMovies.map((item) => (
                                    <TableRow key={item.movieId}>
                                        <TableCell component="th" scope="row">
                                            <Link to={`/movie/${item.movieId}`}>{item.movieTitle}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <img
                                                className="table-img"
                                                src={`${process.env.REACT_APP_IMAGE_URL}w500${item.moviePoster}`}
                                                alt={item.movieTitle}
                                            ></img>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button
                                                className="button-del"
                                                onClick={() => handleDeleteFavMovie(item.movieId)}>Unfavorite</button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <h2 style={{ textAlign: 'center' }}>You don't have any movies in favorites yet!</h2>

                }

            </div>
        </div>
    )
}

export default Favorites
