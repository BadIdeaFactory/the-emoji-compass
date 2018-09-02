import React from 'react'
import CompassHand from './CompassHand'

export default class CompassHandsContainer extends React.Component {
  render () {
    return (
      <div className="compass-hands-container">
        <div className="compass-hands">
          <CompassHand id="1" enabled />
          <CompassHand id="2" enabled={false} />
          <CompassHand id="3" enabled={false} />
          <CompassHand id="4" enabled={false} />
          <div className="compass-hub" />
        </div>
      </div>
    )
  }
}
