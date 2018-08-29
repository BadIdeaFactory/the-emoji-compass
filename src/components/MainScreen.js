import React from 'react'
import PropTypes from 'prop-types'
import Compass from './Compass'
import { init } from '../scripts'
import { getEmojiPosition } from '../utils'
import './MainScreen.css'

const TEXT_DISPLAY = {
  INSTRUCTION1: 'INSTRUCTION1',
  INSTRUCTION2: 'INSTRUCTION2',
  EMOJI_DESCRIPTION: 'EMOJI_DESCRIPTION'
}

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

  constructor (props) {
    super(props)

    this.state = {
      textDisplay: TEXT_DISPLAY.INSTRUCTION1,
      pointingAt: null
    }
  }

  componentDidMount () {
    init()

    window.addEventListener('compass:hand_drag_start', this.handleDragStart)
    window.addEventListener('compass:hand_position_update', this.handleHandPositionUpdate)
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

  handleHandPositionUpdate = (event) => {
    const position = getEmojiPosition(event.detail.rotation, this.props.symbols)

    this.setState({
      pointingAt: position,
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
        const symbol = this.props.symbols[this.state.pointingAt]

        if (!symbol) return null

        return (
          <div className="text-box flavor-text">
            <div id="emoji-output">{symbol.emoji}</div>
            <div id="flavor-text-output">{symbol.text}</div>
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
        <Compass
          symbols={this.props.symbols}
          pointingAt={this.state.pointingAt}
        />
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
