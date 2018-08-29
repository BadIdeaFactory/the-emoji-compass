import React from 'react'
import PropTypes from 'prop-types'
import CompassDial from './CompassDial'
import CompassHandsContainer from './CompassHandsContainer'

export default class Compass extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    }))
  }

  render () {
    return (
      <div className="compass-container" ref={this.compassEl}>
        <CompassDial symbols={this.props.symbols} />
        <CompassHandsContainer />
      </div>
    )
  }
}
