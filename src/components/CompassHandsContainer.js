import React from 'react'
import CompassHand from './CompassHand'

export default class CompassHandsContainer extends React.Component {
  render () {
    return (
      <div className="compass-hands-container">
        <div className="compass-hands">
          <CompassHand id={1} />
          <CompassHand id={2} />
          <CompassHand id={3} />
          <CompassHand id={4} />
          <div className="compass-hub" />
        </div>
      </div>
    )
  }
}
