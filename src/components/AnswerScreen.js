import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Emoji from './Emoji'
import { resetAppState } from '../store/actions/app'

import shareButton from '../img/share_button_v01.svg'
import closeButton from '../img/close_button_v01.svg'

// Note: the following is broken. It displays as all black.
// import { ReactComponent as Arc1 } from '../img/arc_02_1.svg'
// import { ReactComponent as Arc2 } from '../img/arc_02_2.svg'
// To workaround it, we import components manually ported via SVGR.
import ArcContainer from './ArcContainer'

import './AnswerScreen.css'

class AnswerScreen extends React.Component {
  static propTypes = {
    requestEmojis: PropTypes.array,
    responseEmojis: PropTypes.array,
    resetAppState: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      text: null
    }
  }

  handleClickEmoji = (emoji) => {
    this.setState({
      text: emoji.text
    })
  }

  renderEmojiResultRow (emoji) {
    return (
      <tr key={emoji.emoji} className="emoji-table-row">
        <td className="emoji-table-cell">
          <span className="emoji-table-symbol" title={emoji.title}>{emoji.emoji}</span>
        </td>
        <td className="emoji-table-cell emoji-table-description">
          {emoji.text}
        </td>
      </tr>
    )
  }

  render () {
    const { requestEmojis, responseEmojis, resetAppState } = this.props

    // Bail if nothing to show
    if (requestEmojis.length === 0 || responseEmojis.length === 0) return null

    return (
      <div className="final-text">
        <div className="answer-arc-container">
          <ArcContainer type={1} />
          <div className="answer-emojis">
            {requestEmojis.map((emoji, i) => (
              <div onClick={() => this.handleClickEmoji(emoji)} key={i}>
                <Emoji symbol={emoji} />
              </div>
            ))}
          </div>
        </div>

        <div className="answer-arc-container">
          <ArcContainer type={2} />
          <div className="answer-emojis">
            {responseEmojis.map((emoji, i) => (
              <div onClick={() => this.handleClickEmoji(emoji)} key={i}>
                <Emoji symbol={emoji} />
              </div>
            ))}
          </div>
        </div>

        {this.state.text && (
          <div className="answer-text">{this.state.text}</div>
        )}

        <div className="final-buttons">
          <button id="share" title="Share this">
            <img src={shareButton} alt="" />
          </button>
          <button id="ask-another" title="Ask again" onClick={resetAppState}>
            <img src={closeButton} alt="" />
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    requestEmojis: state.app.requestEmojis,
    responseEmojis: state.app.responseEmojis
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetAppState: () => { dispatch(resetAppState()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerScreen)
