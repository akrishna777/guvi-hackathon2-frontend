import React, { useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
  Box,
} from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup'

import { DatePicker, DateTimePicker } from 'formik-mui-lab'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { TextField } from 'formik-mui'
import { useDispatch, useSelector } from 'react-redux'

const AddTheater = ({ currentId, setCurrentId, selectedMovie }) => {
  const [inputField, setInputField] = useState([{ showTiming: '' }])

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
        theaterName: '',
        showTimings: [''],
      }
    } else {
      initialValues = {
        theaterName: '',
        showTimings: [''],
      }
    }
  }

  const validationSchema = Yup.object({
    theaterName: Yup.string().required('Required'),
    showTimings: Yup.array().required('Required'),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false)
      alert(JSON.stringify(values, null, 2))
      // if (currentId) {
      //   console.log(`These are form values:`, values)
      //   setCurrentId(null)
      // } else {
      //   // dispatch(createMovie(values))
      //   alert(JSON.stringify(values, null, 2))
      // }
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
                      <Typography variant="h4">Add Theater</Typography>
                      {movie && (
                        <Typography variant="subtitle2">
                          Movie Name : {movie.title}
                        </Typography>
                      )}
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
                        <Field
                          component={TextField}
                          name="theaterName"
                          type="text"
                          label="Theater Name"
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
                        <FieldArray name="showTimings">
                          {(fieldArrayProps) => {
                            // console.log('fieldArrayProps', fieldArrayProps)
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { showTimings } = values
                            return (
                              <Grid>
                                {showTimings.map((showTiming, index) => (
                                  <Grid
                                    key={index}
                                    sx={{ display: 'flex', marginBottom: 1 }}
                                  >
                                    <Field
                                      component={DateTimePicker}
                                      name={`showTimings[${index}]`}
                                      label="Show Time"
                                      helperText={
                                        touched.name ? 'Required' : ''
                                      }
                                      textField={{
                                        variant: 'outlined',
                                        fullWidth: true,
                                      }}
                                    />
                                    {index > 0 && (
                                      <Button variant="outline">
                                        <RemoveCircleIcon
                                          sx={{ margin: 1, color: 'red' }}
                                          onClick={() => remove(index)}
                                        />
                                      </Button>
                                    )}

                                    <Button>
                                      <AddCircleIcon
                                        sx={{ margin: 1 }}
                                        variant="outline"
                                        onClick={() => push('')}
                                      />
                                    </Button>
                                  </Grid>
                                ))}
                              </Grid>
                            )
                          }}
                        </FieldArray>
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
        </LocalizationProvider>
      )}
    </Formik>
  )
}

export default AddTheater
