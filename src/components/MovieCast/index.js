import {Component} from 'react'

class MovieCast extends Component {
  state = {movieCastDetails: []}

  componentDidMount() {
    this.getMovieCastDetails()
  }

  getMovieCastDetails = async () => {
    const {movieId} = this.props
    const MOVIE_ID = movieId
    const API_KEY = 'fb4b7ddb3aa59cc911271bb38ac8cfda'
    const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('Movie Cast Details')
    console.log(data)
    if (response.ok) {
      const updatedData = data.cast.map(eachCast => ({
        name: eachCast.name,
        originalName: eachCast.original_name,
        image: eachCast.profile_path,
      }))
      this.setState({movieCastDetails: updatedData})
    }
  }

  render() {
    const {movieCastDetails} = this.state
    return (
      <div>
        <p>MovieCast</p>
        <ul>
          {movieCastDetails.map(eachMovie => (
            <li>
              <p>{eachMovie.name}</p>
              <p>{eachMovie.originalName}</p>
              <img
                src={`https://image.tmdb.org/t/p/original${eachMovie.image}`}
                height="150px"
                width="150px"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MovieCast
