import React, { useEffect } from 'react';

import { Link } from 'react-router-dom'

import Axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

import { getFavMovies, updateFavMovies } from '../../redux/actions/favMoviesActions'

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

    useEffect(() => {
        Axios.get('https://mernmoviesapp.herokuapp.com/api/movie/getFavMovies')
            .then((response) => {
                if (response.status === 200) {
                    dispatch(getFavMovies(response.data))
                } else {
                    console.log('Failed getting favMovies')
                }
            })
    }, [dispatch])

    const handleDeleteFavMovie = (id) => {
        Axios.delete(`https://mernmoviesapp.herokuapp.com/api/favorite/delete/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateFavMovies(response.data))
                }
                else {
                    console.log('Failed deleting item')
                }
            })
    }

    return (
        <div className="favorites">
            <div className="favorites__content">
                {favMovies.length > 0 ?
                    <TableContainer className="content__table-cnt" component={Paper}>
                        <Table className="content__table" aria-label="simple table">
                            <TableHead>
                                <TableRow className="content__table-row">
                                    <TableCell><p>Movie Name</p></TableCell>
                                    <TableCell align="right"><p>Poster</p></TableCell>
                                    <TableCell align="right"><p>Action</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favMovies.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell component="th" scope="row">
                                            <Link to={`/movie/${item.movieId}`}>{item.movieTitle}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <img
                                                className="favMovie-table-img"
                                                src={`${process.env.REACT_APP_IMAGE_URL}w500${item.moviePoster}`}
                                                alt={item.movieTitle}
                                            ></img>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button
                                                className="table__button-del"
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
