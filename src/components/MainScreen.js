import React from 'react'
import PropTypes from 'prop-types'
import Compass from './Compass'
import { init } from '../scripts'

export default class MainScreen extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    requestEmojis: PropTypes.array,
    responseEmojis: PropTypes.array,
    addRequestEmoji: PropTypes.func,
    addResponseEmoji: PropTypes.func
  }

  componentDidMount () {
    init()
  }

  render () {
    return (
      <div className="container">
        <Compass
          symbols={this.props.symbols}
        />
        <div className="text-container">
          <hr />
          <div className="text-box instruction-text">
          </div>
          <div className="text-box flavor-text hidden">
            <div id="emoji-output"></div>
            <div id="flavor-text-output"></div>
          </div>
        </div>
      </div>
    )
  }
}
