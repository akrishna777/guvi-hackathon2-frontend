export default (movies = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload
    case 'CREATE':
      return [...movies, action.payload]
    case 'UPDATE':
      return movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie,
      )
    case 'DELETE':
      return movies.filter((movie) => movie._id !== action.payload)

    default:
      return movies
  }
}
