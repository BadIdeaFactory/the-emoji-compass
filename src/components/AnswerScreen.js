import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from './Button'
import Emoji from './Emoji'
import FlavorText from './FlavorText'
import { resetAppState } from '../store/actions/app'

// import { ReactComponent as Arc } from '../img/arc.svg'
// To workaround it, we import components manually ported via SVGR.
import Arc from './Arc'

import ARC_LABEL_REQUEST from '../img/arc_label_request.svg'
import ARC_LABEL_RESPONSE from '../img/arc_label_response.svg'

import './AnswerScreen.css'

class AnswerScreen extends React.Component {
  static propTypes = {
    requestEmojis: PropTypes.array.isRequired,
    responseEmojis: PropTypes.array.isRequired,
    resetAppState: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    // Picks a number from 0, 1, or 2 to start with
    const randomSelectedEmoji = Math.floor(Math.random() * 3)

    this.state = {
      activeArc: 2,
      activeEmoji: randomSelectedEmoji,
      text: this.props.responseEmojis[randomSelectedEmoji].text
    }
  }

  handleSelectRequestEmoji = (index) => {
    this.setState({
      activeArc: 1,
      activeEmoji: index,
      text: this.props.requestEmojis[index].text
    })
  }

  handleSelectResponseEmoji = (index) => {
    this.setState({
      activeArc: 2,
      activeEmoji: index,
      text: this.props.responseEmojis[index].text
    })
  }

  handleShare = (event) => {
    // TODO
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

    const { activeArc, activeEmoji } = this.state

    return (
      <div className="container container-answer-screen">
        <div className="answer-arc-container">
          <Arc active={(activeArc === 1) ? activeEmoji : null} handleSelect={this.handleSelectRequestEmoji} />
          <img src={ARC_LABEL_REQUEST} className="arc-label" alt="I asked:" />
          <div className="answer-emojis">
            {requestEmojis.map((emoji, i) => (
              <Emoji symbol={emoji} key={i} />
            ))}
          </div>
        </div>

        <div className="answer-arc-container">
          <Arc active={(activeArc === 2) ? activeEmoji : null} handleSelect={this.handleSelectResponseEmoji} />
          <img src={ARC_LABEL_RESPONSE} className="arc-label" alt="The compass returned:" />
          <div className="answer-emojis">
            {responseEmojis.map((emoji, i) => (
              <Emoji symbol={emoji} key={i} />
            ))}
          </div>
        </div>

        <div className="answer-text">
          {this.state.text && <FlavorText text={this.state.text} />}
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
