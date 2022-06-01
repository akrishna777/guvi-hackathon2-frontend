import { combineReducers } from 'redux'

import Movies from './Movies'
import Auth from './Auth'
export default combineReducers({
  movies: Movies,
  Auth: Auth,
})
