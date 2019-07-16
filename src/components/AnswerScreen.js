import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Emoji from './Emoji'
import FlavorText from './FlavorText'

// import { ReactComponent as Arc } from '../img/arc.svg'
// To workaround it, we import components manually ported via SVGR.
import Arc from './Arc'

import ARC_LABEL_REQUEST from '../img/arc_label_request.svg'
import ARC_LABEL_RESPONSE from '../img/arc_label_response.svg'

import './AnswerScreen.css'

class AnswerScreen extends React.Component {
  static propTypes = {
    requestEmojis: PropTypes.array.isRequired,
    responseEmojis: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)

    // Picks a number from 0, 1, or 2 to start with
    const randomSelectedEmoji = Math.floor(Math.random() * 3)

    this.intervalTimer = -1

    this.state = {
      userHasInteracted: false,
      activeArc: 2,
      activeEmoji: randomSelectedEmoji,
      text: this.props.responseEmojis[randomSelectedEmoji].text
    }
  }

  componentDidMount () {
    this.intervalTimer = window.setInterval(this.rotateSelection, 3000)
  }

  componentWillUnmount () {
    window.clearInterval(this.intervalTimer)
  }

  handleSelectRequestEmoji = (event, index) => {
    this.setState({
      userHasInteracted: true
    })
    this.selectRequestEmoji(index)
  }

  handleSelectResponseEmoji = (event, index) => {
    this.setState({
      userHasInteracted: true
    })
    this.selectResponseEmoji(index)
  }

  selectRequestEmoji = (index) => {
    this.setState({
      activeArc: 1,
      activeEmoji: index,
      text: this.props.requestEmojis[index].text
    })
  }

  selectResponseEmoji = (index) => {
    this.setState({
      activeArc: 2,
      activeEmoji: index,
      text: this.props.responseEmojis[index].text
    })
  }

  /**
   * Automatically select the next emoji, as long as user has not
   * yet interacted with the answers.
   */
  rotateSelection = () => {
    if (this.state.userHasInteracted === true) return
    const { activeArc, activeEmoji } = this.state
    if (activeArc === 1) {
      if (activeEmoji === 2) {
        this.selectResponseEmoji(0)
      } else {
        this.selectRequestEmoji(activeEmoji + 1)
      }
    }
    if (activeArc === 2) {
      if (activeEmoji === 2) {
        this.selectRequestEmoji(0)
      } else {
        this.selectResponseEmoji(activeEmoji + 1)
      }
    }
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
    const { requestEmojis, responseEmojis } = this.props

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

export default connect(mapStateToProps)(AnswerScreen)
