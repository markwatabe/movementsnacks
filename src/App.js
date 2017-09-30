import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from './components/Loader'

const AsyncGame = Loadable({
  loader: () => import('./components/Game'),
  loading: Loader
});

const Async3d= Loadable({
  loader: () => import('./routes/herenow'),
  loading: Loader
});

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/game/xlkjsdf">GAME: xlkjsdf</Link></li>
        <li><Link to="/game/678">GAME: 678</Link></li>
      </ul>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/game/:id" component={AsyncGame}/>
      <Route path="/3d" component={Async3d}/>
    </div>
  </Router>
)

export default BasicExample
