import {Link} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Navbar = () => {
  const [searchVal, changeSearch] = useState('')
  const onChangeSearch = event => {
    changeSearch(event.target.value)
  }

  return (
    <nav className="navbar">
      <h1 className="logo">movieDB</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchVal}
          onChange={onChangeSearch}
          id="search-input"
        />
        <Link to={`/search/${searchVal}`}>
          <button type="button">Search</button>
        </Link>
      </div>
      <div className="nav-links">
        <button type="button">
          <Link to="/">Popular</Link>
        </button>

        <button type="button">
          <Link to="/top-rated">Top Rated</Link>
        </button>

        <button type="button">
          <Link to="/upcoming">Upcoming</Link>
        </button>
      </div>
    </nav>
  )
}
export default Navbar
