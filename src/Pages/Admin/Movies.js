import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { getMovies } from '../../actions/Movies'
import Movie from '../../components/Movie'

const Movies = ({ currentId, setCurrentId, selectedMovie2 }) => {
  const movies = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  console.log(movies)

  useEffect(() => {
    dispatch(getMovies())
  }, [dispatch])
  return !movies.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={1}>
      {movies.map((movie) => (
        <Grid
          key={movie._id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px',
          }}
        >
          <Movie
            movie={movie}
            currentId
            setCurrentId
            selectedMovie2={selectedMovie2}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Movies
