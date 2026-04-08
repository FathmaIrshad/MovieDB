import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

class SearchedMovie extends Component {
  state = {searchedmovie: [], isLoading: true}

  componentDidMount() {
    this.getSearchedMovie()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const {searchedMovie} = params
    const movieSearched = searchedMovie
    if (prevProps.match.params.searchedMovie !== movieSearched) {
      this.getSearchedMovie()
    }
  }

  getSearchedMovie = async () => {
    const API_KEY = 'fb4b7ddb3aa59cc911271bb38ac8cfda'
    const {match} = this.props
    const {params} = match
    const {searchedMovie} = params
    const MOVIE_NAME = searchedMovie
    console.log(MOVIE_NAME)
    const SearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(SearchAPI, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(eachMovie => ({
        title: eachMovie.title,
        image: eachMovie.poster_path,
        movieId: eachMovie.id,
        rating: eachMovie.vote_average,
      }))
      this.setState({searchedmovie: updatedData, isLoading: false})
    }
  }

  render() {
    const {searchedmovie, isLoading} = this.state
    return (
      <div>
        <Navbar />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="container">
            <h1>Searched Movies Page</h1>
            <ul>
              {searchedmovie.map(eachMovie => (
                <li key={eachMovie.movieId}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${eachMovie.image}`}
                    height="200px"
                    width="200px"
                  />
                  <h1>{eachMovie.title}</h1>
                  <p>{eachMovie.rating}</p>
                  <Link to={`/${eachMovie.movieId}`}>
                    <button type="button">View Details</button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default SearchedMovie
