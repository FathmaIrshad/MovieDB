import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class Popular extends Component {
  state = {popularmovies: [], currentPage: 1, moviesPerPage: 9, isLoading: true}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {popularmovies, isLoading, currentPage} = this.state
    const API_KEY = 'fb4b7ddb3aa59cc911271bb38ac8cfda'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(eachMovie => ({
        title: eachMovie.title,
        image: eachMovie.poster_path,
        movieId: eachMovie.id,
        rating: eachMovie.vote_average,
      }))
      this.setState({popularmovies: updatedData, isLoading: false})
    }
  }

  onClickPreviousPage = () => {
    const {popularmovies, currentPage, moviesPerPage} = this.state
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
    const {popularmovies, currentPage, moviesPerPage, isLoading} = this.state
    const indexofLastMovie = currentPage * moviesPerPage
    const indexofFirstMovie = indexofLastMovie - moviesPerPage
    const slicedPopularMovies = popularmovies.slice(
      indexofFirstMovie,
      indexofLastMovie,
    )

    return (
      <div>
        <Navbar />
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="container">
            <h1>Popular</h1>
            <ul className="row">
              {slicedPopularMovies.map(eachMovie => (
                <li key={eachMovie.movieId} className="col-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${eachMovie.image}`}
                    height="150px"
                    width="150px"
                  />
                  <p>{eachMovie.title}</p>
                  <p>{eachMovie.rating}</p>
                  <Link to={`/${eachMovie.movieId}`}>
                    <button type="button">View Details</button>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pagination-container">
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
                  slicedPopularMovies[slicedPopularMovies.length - 1] ===
                  popularmovies[popularmovies.length - 1]
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Popular
