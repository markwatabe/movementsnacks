import React from 'react';
import { Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from '../../components/Loader'

const AsyncHome = Loadable({
  loader: () => import('../home'),
  loading: Loader,
})

const AsyncWood = Loadable({
  loader: () => import('../../routes/wood'),
  loading: Loader,
})

export default () => (
  <div>
    <header>

    </header>
    <main>
      <Route exact path="/" component={AsyncWood} />
      <Route exact path="/image-test" component={AsyncHome} />
    </main>
  </div>
)

//<Link to="/">Home</Link>
