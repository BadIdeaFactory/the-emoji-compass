import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Compass from './Compass'
import { init } from '../scripts'
import { getEmojiPosition } from '../utils'
import './MainScreen.css'

const TEXT_DISPLAY = {
  INSTRUCTION1: 'INSTRUCTION1',
  INSTRUCTION2: 'INSTRUCTION2',
  EMOJI_DESCRIPTION: 'EMOJI_DESCRIPTION'
}

class MainScreen extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    requestEmojis: PropTypes.array,
    handPosition: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.state = {
      textDisplay: TEXT_DISPLAY.INSTRUCTION1
    }
  }

  componentDidMount () {
    init()

    window.addEventListener('compass:hand_drag_start', this.handleDragStart)
    window.addEventListener('dial-1:dragend', this.showInstruction2)
    window.addEventListener('dial-2:dragend', this.showInstruction2)
  }

  componentWillUnmount () {
    window.removeEventListener('compass:hand_drag_start', this.handleDragStart)
    window.removeEventListener('dial-1:dragend', this.showInstruction2)
    window.removeEventListener('dial-2:dragend', this.showInstruction2)
  }

  handleDragStart = (event) => {
    this.setState({
      textDisplay: TEXT_DISPLAY.EMOJI_DESCRIPTION
    })
  }

  showInstruction2 = (event) => {
    this.setState({
      textDisplay: TEXT_DISPLAY.INSTRUCTION2
    })
  }

  renderTextContents = () => {
    switch (this.state.textDisplay) {
      case TEXT_DISPLAY.EMOJI_DESCRIPTION: {
        const symbol = this.props.symbols[this.props.handPosition]

        if (!symbol) return null

        return (
          <div className="text-box flavor-text">
            <div className="flavor-text-emoji">{symbol.emoji}</div>
            <div className="flavor-text-description">{symbol.text}</div>
          </div>
        )
      }
      case TEXT_DISPLAY.INSTRUCTION2:
        return (
          <div className="text-box instruction-text">
            Drag the next dial to select the next emoji.
          </div>
        )
      case TEXT_DISPLAY.INSTRUCTION1:
      default:
        return (
          <div className="text-box instruction-text">
            To ask a question of the compass, rotate the highlighted dial.
          </div>
        )
    }
  }

  render () {
    return (
      <div className="container">
        <Compass />
        <div className="emoji-requested">
          {this.props.requestEmojis.map((symbol, i) => (
            <span key={i}>
              {symbol.emoji}
            </span>
          ))}
        </div>
        <div className="text-container">
          {this.renderTextContents()}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    symbols: state.app.symbols,
    requestEmojis: state.app.requestEmojis,
    handPosition: state.app.handPosition
  }
}

export default connect(mapStateToProps)(MainScreen)
