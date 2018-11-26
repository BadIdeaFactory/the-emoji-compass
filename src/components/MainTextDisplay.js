import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Emoji from './Emoji'
import FlavorText from './FlavorText';
import './MainTextDisplay.css'

const TEXT_DISPLAY = {
  INSTRUCTION1: 'INSTRUCTION1',
  INSTRUCTION2: 'INSTRUCTION2',
  EMOJI_DESCRIPTION: 'EMOJI_DESCRIPTION'
}

class MainTextDisplay extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    handPosition: PropTypes.number,
    activeHand: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.state = {
      textDisplay: TEXT_DISPLAY.INSTRUCTION1
    }
  }

  componentDidMount () {
    window.addEventListener('compass:hand_drag_start', this.handleDragStart)
  }

  componentWillUnmount () {
    window.removeEventListener('compass:hand_drag_start', this.handleDragStart)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeHand && props.activeHand > 1 && props.handPosition === null) {
      return {
        textDisplay: TEXT_DISPLAY.INSTRUCTION2
      }
    }

    if (Number.isInteger(props.handPosition)) {
      return {
        textDisplay: TEXT_DISPLAY.EMOJI_DESCRIPTION
      }
    }

    return null
  }

  handleDragStart = (event) => {
    this.setState({
      textDisplay: TEXT_DISPLAY.EMOJI_DESCRIPTION
    })
  }

  renderTextContents = () => {
    switch (this.state.textDisplay) {
      case TEXT_DISPLAY.EMOJI_DESCRIPTION: {
        const symbol = this.props.symbols[this.props.handPosition]

        if (!symbol) return null

        return (
          <div className="text-box flavor-text">
            <div className="flavor-text-emoji">
              <Emoji symbol={symbol} />
            </div>
            <div className="flavor-text-description">
              <FlavorText text={symbol.text} />
            </div>
          </div>
        )
      }
      case TEXT_DISPLAY.INSTRUCTION2:
        return (
          <div className="text-box instruction-text">
            Drag the next hand to select the next emoji.
          </div>
        )
      case TEXT_DISPLAY.INSTRUCTION1:
      default:
        return (
          <div className="text-box instruction-text">
            To ask a question of the compass, rotate the highlighted hand.
          </div>
        )
    }
  }

  render () {
    return (
      <div className="text-container">
        {this.renderTextContents()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    symbols: state.app.symbols,
    handPosition: state.app.handPosition,
    activeHand: state.app.activeHand
  }
}

export default connect(mapStateToProps)(MainTextDisplay)
