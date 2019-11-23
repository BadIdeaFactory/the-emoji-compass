import React from 'react'
import CompassNeedle from './CompassNeedle'
import CompassNeedleResponse from './CompassNeedleResponse'
import './CompassNeedlesContainer.css'

export default class CompassNeedlesContainer extends React.Component {
  render () {
    return (
      <div className="compass-needles-container">
        <div className="compass-needles">
          {/* <CompassNeedle id={1} type="request" />
          <CompassNeedle id={2} type="request" />
          <CompassNeedle id={3} type="request" />
          <CompassNeedle id={4} type="response" /> */}
          <CompassNeedleResponse />
          <div className="compass-hub" />
        </div>
      </div>
    )
  }
}
