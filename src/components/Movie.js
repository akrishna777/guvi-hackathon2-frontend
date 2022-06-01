import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'

const Movie = ({ movie, currentId, setCurrentId, selectedMovie2 }) => {
  return (
    <div>
      <Grid item maxWidth={300}>
        <Grid item pt={1}>
          <Card key={movie._id}>
            <CardMedia component="img" alt="green iguana" image={movie.image} />
            <CardActions sx={{ backgroundColor: '#000000' }}>
              <Button
                size="small"
                sx={{ color: 'white' }}
                onClick={(id) => selectedMovie2(movie._id)}
              >
                ADD THEATERS
              </Button>
              <Button size="small" sx={{ color: 'white' }}>
                VIEW BOOKINGS
              </Button>
            </CardActions>
          </Card>
          <Typography variant="h6" textAlign="left">
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" textAlign="left">
            {movie.genre}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Movie
