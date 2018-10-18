import React from 'react'
import PropTypes from 'prop-types'

import alphaomega from '../img/alphaomega.svg'

export default class Symbol extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    symbol: PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    }),
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  handleClick = (event) => {
    this.props.onClick(this.props.symbol)
  }

  render () {
    // Special case αΩ
    if (this.props.symbol.emoji === 'αΩ') {
      return (
        <div className={this.props.className} onClick={this.handleClick}>
          <span>
            <img src={alphaomega} alt="αΩ" />
          </span>
        </div>
      )
    }

    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <span>
          {this.props.symbol.emoji}
        </span>
      </div>
    )
  }
}
