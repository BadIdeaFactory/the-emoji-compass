import React from 'react'
import PropTypes from 'prop-types'
import Emoji from './Emoji'

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
    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <Emoji symbol={this.props.symbol} />
      </div>
    )
  }
}
