import React from 'react'
import PropTypes from 'prop-types'
import CompassDial from './CompassDial'
import CompassHandsContainer from './CompassHandsContainer'
import './Compass.css'

export default class Compass extends React.Component {
  static propTypes = {
    pointingAt: PropTypes.number
  }

  render () {
    return (
      <div className="compass-container" ref={this.compassEl}>
        <CompassDial pointingAt={this.props.pointingAt} />
        <CompassHandsContainer />
      </div>
    )
  }
}
