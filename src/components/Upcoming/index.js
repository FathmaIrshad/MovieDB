import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class Upcoming extends Component {
  state = {
    upcomingmovies: [],
    isLoading: true,
    currentPage: 1,
    moviesPerPage: 9,
  }

  componentDidMount() {
    this.getUpcomingMovies()
  }

  getUpcomingMovies = async () => {
    const {upcomingmovies, currentPage} = this.state
    const API_KEY = 'fb4b7ddb3aa59cc911271bb38ac8cfda'
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(upcomingMoviesURL, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(eachMovie => ({
        title: eachMovie.title,
        image: eachMovie.poster_path,
        movieId: eachMovie.id,
        rating: eachMovie.vote_average,
      }))
      this.setState({upcomingmovies: updatedData, isLoading: false})
    }
  }

  onClickPreviousPage = () => {
    const {currentPage, moviesPerPage} = this.state
    if (currentPage > 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
      }))
    }
  }

  onClickNextPage = () => {
    const {currentPage, moviesPerPage} = this.state
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  }

  render() {
    const {upcomingmovies, currentPage, moviesPerPage, isLoading} = this.state
    const indexofLastMovie = currentPage * moviesPerPage
    const indexofFirstMovie = indexofLastMovie - moviesPerPage
    const slicedUpcomingMovies = upcomingmovies.slice(
      indexofFirstMovie,
      indexofLastMovie,
    )
    return (
      <div>
        <Navbar />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1>Upcoming</h1>
            <ul>
              {slicedUpcomingMovies.map(eachMovie => (
                <li key={eachMovie.movieId}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${eachMovie.image}`}
                    height="200px"
                    width="200px"
                  />
                  <p>{eachMovie.title}</p>
                  <p>{eachMovie.rating}</p>
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
                <p>{currentPage}</p>
                <button
                  type="button"
                  onClick={this.onClickNextPage}
                  disabled={
                    slicedUpcomingMovies[slicedUpcomingMovies.length - 1] ===
                    upcomingmovies[upcomingmovies.length - 1]
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

export default Upcoming
