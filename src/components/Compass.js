import React from 'react'
import CompassDial from './CompassDial'
import CompassNeedlesContainer from './CompassNeedlesContainer'
import './Compass.css'

export default class Compass extends React.Component {
  render () {
    return (
      <div className="compass-container">
        <CompassDial/>
        <CompassNeedlesContainer />
      </div>
    )
  }
}
