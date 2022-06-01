import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../../actions/Movies'
import { Button } from '@mui/material'

import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { deleteMovie } from '../../actions/Movies'

const ViewMovies = ({ setCurrentId, selectedMovie }) => {
  const movies = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getMovies())
  }, [dispatch])

  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Movie Title</TableCell>
            <TableCell align="center">Language</TableCell>
            <TableCell align="center">Release Date</TableCell>
            <TableCell align="center">Edit / Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie._id}>
              <TableCell align="center">{movie.title}</TableCell>
              <TableCell align="center">{movie.language}</TableCell>
              <TableCell align="center">
                {moment(movie.releaseDate).format('MMMM Do YYYY')}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                  onClick={(id) => selectedMovie(movie._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                  onClick={() => dispatch(deleteMovie(movie._id))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ViewMovies
