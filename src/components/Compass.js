import React from 'react'
import CompassDial from './CompassDial'
import CompassHandsContainer from './CompassHandsContainer'
import './Compass.css'

export default class Compass extends React.Component {
  render () {
    return (
      <div className="compass-container">
        <CompassDial/>
        <CompassHandsContainer />
      </div>
    )
  }
}
