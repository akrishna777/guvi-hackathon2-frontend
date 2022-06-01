import * as api from '../api'

// Action Creators
export const getMovies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMovies()
    dispatch({ type: 'FETCH_ALL', payload: data })
  } catch (error) {
    console.log(error)
  }

  const action = { type: 'FETCH_ALL', payload: [] }
}

export const createMovie = (movie) => async (dispatch) => {
  try {
    const { data } = await api.createMovie(movie)

    dispatch({ type: 'CREATE', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateMovie = (id, movie) => async (dispatch) => {
  try {
    const { data } = await api.updateMovie(id, movie)

    dispatch({ type: 'UPDATE', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await api.deleteMovie(id)

    dispatch({ type: 'DELETE', payload: id })
  } catch (error) {
    console.log(error)
  }
}
