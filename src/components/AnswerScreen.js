import React from 'react'
import './AnswerScreen.css'

export default class AnswerScreen extends React.Component {
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
    const { requestEmojis, responseEmojis, handleAskAnother } = this.props

    // Bail if nothing to show
    if (requestEmojis.length === 0 || responseEmojis.length === 0) return null

    return (
      <div className="text-box final-text">
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
          <button id="share">Share this</button>
          <button id="ask-another" onClick={handleAskAnother}>Ask again</button>
        </span>
      </div>
    )
  }
}
