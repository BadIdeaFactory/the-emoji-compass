import React from 'react'
import PropTypes from 'prop-types'
import CompassHand from './CompassHand'

export default class CompassHandsContainer extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    }))
  }

  render () {
    return (
      <div className="compass-hands-container">
        <div className="compass-hands">
          <CompassHand id="1" enabled  symbols={this.props.symbols} />
          <CompassHand id="2" enabled={false} symbols={this.props.symbols} />
          <CompassHand id="3" enabled={false} symbols={this.props.symbols} />
          <CompassHand id="4" enabled={false} symbols={this.props.symbols} />
          <div className="compass-hub" />
        </div>
      </div>
    )
  }
}
