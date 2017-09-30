import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggleDrawer,
} from '../../modules/tracker'
import Timer from '../../components/Timer'

const mapStateToProps = state => ({
  time: 0,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
