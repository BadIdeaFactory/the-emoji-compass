import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resetAppState } from '../store/actions/app'

import shareButton from '../img/share_button_v01.svg'
import closeButton from '../img/close_button_v01.svg'
import './AnswerScreen.css'

class AnswerScreen extends React.Component {
  static propTypes = {
    requestEmojis: PropTypes.array,
    responseEmojis: PropTypes.array,
    resetAppState: PropTypes.func
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
        <span>
          I asked the emoji compass
          <span id="final-emoji-1">
            {requestEmojis.map(function(i) { return i.emoji }).join(' ')}
          </span>
          and it answered
          <span id="final-emoji-2">
            <table className="emoji-table">
              <tbody>
                {responseEmojis.map(this.renderEmojiResultRow)}
              </tbody>
            </table>
          </span>
        </span>
        <span className="final-buttons">
          <button id="share" title="Share this">
            <img src={shareButton} />
          </button>
          <button id="ask-another" title="Ask again" onClick={resetAppState}>
            <img src={closeButton} />
          </button>
        </span>
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
