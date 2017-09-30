import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import tracker from './tracker'
import firebase from './firebase'

export default combineReducers({
  routing: routerReducer,
  tracker,
  counter,
  firebase,
})
