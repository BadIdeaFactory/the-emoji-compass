import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import Emoji from './Emoji'
import FlavorText from './FlavorText';
import './MainTextDisplay.css'

const TEXT_DISPLAY = {
  INSTRUCTION1: 'INSTRUCTION1',
  INSTRUCTION2: 'INSTRUCTION2',
  EMOJI_DESCRIPTION: 'EMOJI_DESCRIPTION',
  RESPONSE_EMOJIS: 'RESPONSE_EMOJIS'
}

class MainTextDisplay extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    needlePosition: PropTypes.number,
    activeNeedle: PropTypes.number,
    responseEmojis: PropTypes.array
  }

  static defaultProps = {
    responseEmojis: []
  }

  constructor (props) {
    super(props)

    this.state = {
      textDisplay: TEXT_DISPLAY.INSTRUCTION1
    }
  }

  componentDidMount () {
    window.addEventListener('compass:needle_drag_start', this.handleDragStart)
  }

  componentWillUnmount () {
    window.removeEventListener('compass:needle_drag_start', this.handleDragStart)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeNeedle && props.activeNeedle > 1 && props.needlePosition === null) {
      return {
        textDisplay: TEXT_DISPLAY.INSTRUCTION2
      }
    }

    if (props.activeNeedle === 4) {
      return {
        textDisplay: TEXT_DISPLAY.RESPONSE_EMOJIS
      }
    }

    if (Number.isInteger(props.needlePosition)) {
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
        const symbol = this.props.symbols[this.props.needlePosition]

        if (!symbol) return null

        return (
          <div className="text-box emoji-description">
            {/* <Emoji symbol={symbol} /> */}
            <FlavorText text={symbol.text} />
          </div>
        )
      }
      case TEXT_DISPLAY.RESPONSE_EMOJIS:
        return (
          <div className="text-box emoji-picking">
            {this.props.responseEmojis.map((emoji, i) => (
              <Fragment key={i}>
                <CSSTransition in={true} classNames="show" timeout={150} appear={true}>
                  <Emoji symbol={emoji} />
                </CSSTransition>
              </Fragment>
            ))}
          </div>
        )
      case TEXT_DISPLAY.INSTRUCTION2:
        return (
          <div className="text-box instruction-text">
            <p>
              Drag the next needle to select the next emoji.
            </p>
          </div>
        )
      case TEXT_DISPLAY.INSTRUCTION1:
      default:
        return (
          <div className="text-box instruction-text">
            <p>
              Ask a question by choosing three symbols.
            </p>
            <p>
              Rotate the hands of the compass to select the first.
            </p>
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
    needlePosition: state.app.needlePosition,
    activeNeedle: state.app.activeNeedle,
    responseEmojis: state.app.responseEmojis
  }
}

export default connect(mapStateToProps)(MainTextDisplay)
