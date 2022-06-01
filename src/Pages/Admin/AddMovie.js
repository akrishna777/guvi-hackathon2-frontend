import * as React from 'react'
import { render } from 'react-dom'
import { Formik, Form, Field, FieldArray } from 'formik'
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  FormControlLabel,
  Typography,
  AutocompleteRenderInputParams,
  ToggleButton,
  Grid,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import MuiTextField from '@mui/material/TextField'
import {
  Autocomplete,
  TextField,
  Select,
  Switch,
  ToggleButtonGroup,
} from 'formik-mui'
import { TimePicker, DatePicker, DateTimePicker } from 'formik-mui-lab'
import * as Yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'

import { createMovie, updateMovie } from '../../actions/Movies'
import { useNavigate } from 'react-router-dom'

const AddMovie = ({ currentId, setCurrentId, selectedMovie }) => {
  const dispatch = useDispatch()
  console.log(`This is currentID in ADD MOVIES page:`, currentId)

  const movie = useSelector((state) =>
    currentId ? state.movies.find((m) => m._id === currentId) : null,
  )
  console.log(movie)

  let initialValues = {}

  {
    if (currentId) {
      initialValues = {
        title: movie.title,
        language: movie.language,
        genre: movie.genre,
        director: movie.director,
        cast: movie.cast,
        description: movie.description,
        duration: movie.duration,
        releaseDate: movie.releaseDate,
        endDate: movie.endDate,
        image: movie.image,
      }
    } else {
      initialValues = {
        title: '',
        language: '',
        genre: '',
        director: '',
        cast: '',
        description: '',
        duration: '',
        releaseDate: '',
        endDate: '',
        image: '',
      }
    }
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    language: Yup.string().required('Required'),
    genre: Yup.string().required('Required'),
    director: Yup.string().required('Required'),
    cast: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    duration: Yup.string().required('Required'),
    releaseDate: Yup.date().required('Required'),
    endDate: Yup.date().required('Required'),
    image: Yup.string().required('Required'),
  })

  // Modal States Start
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // Modal States End

  const navigate = useNavigate()

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false)
      // alert(JSON.stringify(values, null, 2))
      if (currentId) {
        dispatch(updateMovie(currentId, values))
        setCurrentId(null)
        handleClickOpen()
      } else {
        dispatch(createMovie(values))
        handleClickOpen()
      }
    }, 500)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form>
            <Grid
              item
              container
              spacing={2}
              xs={12}
              alignItems="center"
              justify="center"
            >
              <Container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={12} sm={12} md={7} lg={7} mt={4}>
                  <Paper elevation={5}>
                    <Grid item xs={12} pt={2}>
                      <Typography variant="h4">Add a Movie</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="title"
                          type="text"
                          label="Title"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="language"
                          type="text"
                          label="Language"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="genre"
                          type="text"
                          label="Genre"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="director"
                          type="text"
                          label="Director"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="cast"
                          type="text"
                          label="Cast"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="description"
                          type="text"
                          label="Description"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="duration"
                          type="number"
                          label="Duration"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={DatePicker}
                          name="releaseDate"
                          type="date"
                          label="Release Date"
                          helperText={touched.name ? 'Required' : ''}
                          textField={{
                            variant: 'outlined',
                            fullWidth: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={DatePicker}
                          name="endDate"
                          type="date"
                          label="Screening Ending On"
                          helperText={touched.name ? 'Required' : ''}
                          textField={{
                            variant: 'outlined',
                            fullWidth: true,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="image"
                          type="text"
                          label="Image URL"
                          helperText={touched.name ? 'Required' : ''}
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        sx={{ margin: 2 }}
                      >
                        <Box margin={1}>
                          <Button
                            sx={{ margin: 1 }}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                          >
                            {currentId ? 'Update Movie' : 'Add Movie'}
                          </Button>
                          <Button
                            sx={{ margin: 1 }}
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitting}
                            onClick={() => {
                              resetForm()
                            }}
                          >
                            Reset
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Container>
            </Grid>
          </Form>
          {/* Modal Start */}
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Successfully Submitted'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The form has been successfully submitted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={() => navigate('/')} autoFocus>
                  View Movies
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* Modal End */}
        </LocalizationProvider>
      )}
    </Formik>
  )
}

export default AddMovie
