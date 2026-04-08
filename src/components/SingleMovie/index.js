import {Component} from 'react'
import MovieCast from '../MovieCast'
import Navbar from '../Navbar'

class SingleMovie extends Component {
  state = {singleMovieDetails: {}}

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getSingleMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {movieId} = params
    const MOVIE_ID = movieId
    const API_KEY = 'fb4b7ddb3aa59cc911271bb38ac8cfda'
    const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('SingleMovieData')
    console.log(data)
    if (response.ok) {
      this.setState({singleMovieDetails: data})
    }
  }

  render() {
    const {singleMovieDetails} = this.state
    const {match} = this.props
    const {params} = match
    const {movieId} = params
    return (
      <div className="movie-details-container">
        <Navbar />
        <h1>Movie details section</h1>
        <p>{singleMovieDetails.title}</p>
        <img
          src={`https://image.tmdb.org/t/p/original${singleMovieDetails.poster_path}`}
          height="200px"
          width="200px"
        />
        <p>{singleMovieDetails.vote_average}</p>
        <p>{singleMovieDetails.runtime}</p>
        {singleMovieDetails.genres && (
          <ul>
            {singleMovieDetails.genres.map(eachGenre => (
              <li key={eachGenre.id}>
                <p>{eachGenre.name}</p>
              </li>
            ))}
          </ul>
        )}
        <p>{singleMovieDetails.release_date}</p>
        <p>{singleMovieDetails.overview}</p>
        <h2>Movie Cast Details</h2>
        <MovieCast movieId={movieId} />
      </div>
    )
  }
}
export default SingleMovie
