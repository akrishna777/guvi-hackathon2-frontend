import axios from 'axios'

const API = axios.create({
  baseURL: 'https://bookmyshow-hackathon.herokuapp.com/',
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})

export const fetchMovies = () => API.get('/movies')
export const createMovie = (newMovie) => API.post('/movies', newMovie)
export const updateMovie = (id, updatedMovie) =>
  API.patch(`/movies/${id}`, updatedMovie)

export const deleteMovie = (id) => API.delete(`/movies/${id}`)

export const signIn = (formData) => API.post(`/user/signin`, formData)
export const signUp = (formData) => API.post(`/user/signup`, formData)
