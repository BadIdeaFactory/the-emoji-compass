import React from 'react'

export default class CompassHandsContainer extends React.Component {
  renderHands = () => {
    // Render four hands.
  }

  render () {
    return (
      <div className="dials-container">
        <div id="dials">
          {this.renderHands()}
          <div className="dials-cap" />
        </div>
      </div>
    )
  }
}
