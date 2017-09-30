import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggleDrawer,
} from '../../modules/tracker'
import Tracker from '../../components/Tracker'

const mapStateToProps = state => {
  console.log("STATE", state)
  return { moves: state.tracker }
}

/*({

  moves: [],
})*/

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker)
