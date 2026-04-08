import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class TopRated extends Component {
  state = {topmovies: [], isLoading: true, currentPage: 1, moviesPerPage: 9}

  componentDidMount() {
    this.getTopMovies()
  }

  getTopMovies = async () => {
    const {topmovies, isLoading, currentPage} = this.state
    const API_KEY = 'fb4b7ddb3aa59cc911271bb38ac8cfda'
    const topRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(topRatedMoviesURL, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(eachMovie => ({
        title: eachMovie.title,
        poster_path: eachMovie.poster_path,
        movieId: eachMovie.id,
        vote_average: eachMovie.vote_average,
      }))
      this.setState({topmovies: updatedData, isLoading: false})
    }
  }

  onClickPreviousPage = () => {
    const {topmovies, currentPage, moviesPerPage} = this.state
    if (currentPage > 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
      }))
    }
  }

  onClickNextPage = () => {
    const {topmovies, moviesPerPage} = this.state
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  }

  render() {
    const {topmovies, currentPage, moviesPerPage, isLoading} = this.state
    const indexofLastMovie = currentPage * moviesPerPage
    const indexofFirstMovie = indexofLastMovie - moviesPerPage
    const slicedTopMovies = topmovies.slice(indexofFirstMovie, indexofLastMovie)
    return (
      <div>
        <Navbar />
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div>
            <h1>Top Rated</h1>
            <ul>
              {slicedTopMovies.map(eachMovie => (
                <li key={eachMovie.movieId}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`}
                    height="200px"
                    width="200px"
                  />
                  <p>{eachMovie.title}</p>
                  <p>{eachMovie.vote_average}</p>
                  <Link to={`/${eachMovie.movieId}`}>
                    <button type="button">View Details</button>
                  </Link>
                </li>
              ))}
            </ul>
            <nav className="pagination-container">
              <div className="pagination">
                <button
                  type="button"
                  onClick={this.onClickPreviousPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                <p className="pageNumber">{currentPage}</p>

                <button
                  type="button"
                  onClick={this.onClickNextPage}
                  disabled={
                    slicedTopMovies[slicedTopMovies.length - 1] ===
                    topmovies[topmovies.length - 1]
                  }
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    )
  }
}

export default TopRated
