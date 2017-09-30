import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Tracker from '../../containers/tracker'
import Timer from '../../containers/timer'

import {
  loadCurriculum,
} from '../../modules/firebase'

const Wood = ({ onLoadCurriculum }) => (
  <div>
    <button onClick={onLoadCurriculum}>Handstand</button>
    <Tracker />
    <Timer />
  </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoadCurriculum: () => dispatch(loadCurriculum()),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wood)


//return function (dispatch, getState) {