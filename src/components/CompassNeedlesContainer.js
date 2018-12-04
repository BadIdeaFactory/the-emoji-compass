import React from 'react'
import CompassNeedle from './CompassNeedle'

export default class CompassNeedlesContainer extends React.Component {
  render () {
    return (
      <div className="compass-needles-container">
        <div className="compass-needles">
          <CompassNeedle id={1} />
          <CompassNeedle id={2} />
          <CompassNeedle id={3} />
          <CompassNeedle id={4} />
          <div className="compass-hub" />
        </div>
      </div>
    )
  }
}
