import React from 'react'
import PropTypes from 'prop-types'
import Compass from './Compass'
import { init } from '../scripts'
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
      flavorEmoji: null
    }
  }

  componentDidMount () {
    init()

    window.addEventListener('compass:hand_drag_start', this.handleDragStart)
    window.addEventListener('compass:show_flavor_text', this.showFlavorText)
    window.addEventListener('dial-1:dragend', this.showInstruction2)
    window.addEventListener('dial-2:dragend', this.showInstruction2)
  }

  componentWillUnmount () {
    window.removeEventListener('compass:hand_drag_start', this.handleDragStart)
    window.removeEventListener('compass:show_flavor_text', this.showFlavorText)
    window.removeEventListener('dial-1:dragend', this.showInstruction2)
    window.removeEventListener('dial-2:dragend', this.showInstruction2)
  }

  handleDragStart = (event) => {
    this.setState({
      textDisplay: TEXT_DISPLAY.EMOJI_DESCRIPTION
    })
  }

  showFlavorText = (event) => {
    this.setState({
      flavorEmoji: event.detail.emoji
    })
  }

  showInstruction2 = (event) => {
    this.setState({
      textDisplay: TEXT_DISPLAY.INSTRUCTION2
    })
  }

  renderTextContents = () => {
    switch (this.state.textDisplay) {
      case TEXT_DISPLAY.EMOJI_DESCRIPTION:
        if (!this.state.flavorEmoji) return null
        return (
          <div className="text-box flavor-text">
            <div id="emoji-output">{this.state.flavorEmoji.emoji}</div>
            <div id="flavor-text-output">{this.state.flavorEmoji.text}</div>
          </div>
        )
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
