import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import NotFound from './components/NotFound'
import SingleMovie from './components/SingleMovie'
import SearchedMovie from './components/SearchedMovie'

// write your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/search/:searchedMovie" component={SearchedMovie} />
        <Route exact path="/:movieId" component={SingleMovie} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="/notfound" />
      </Switch>
    )
  }
}

export default App
