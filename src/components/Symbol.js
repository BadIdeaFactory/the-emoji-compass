import React from 'react'
import PropTypes from 'prop-types'

export default class Symbol extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    symbol: PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })
  }

  render () {
    return (
      <div className={this.props.className}>
        <span>
          {this.props.symbol.emoji}
        </span>
      </div>
    )
  }
}