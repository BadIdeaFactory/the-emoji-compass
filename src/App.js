import React, { Component } from 'react'
import MainScreen from './components/MainScreen'
import AnswerScreen from './components/AnswerScreen'
import symbols from './symbols.json'

// If a viewer tabs away or minimizes the browser, and returns after
// this amount of time, fast forward to final screen instead of
// continuing with the animation. Value is stored as milliseconds.
const IMPATIENCE_TIME_LIMIT = 1000 //20000

const ROUTES = {
  MAIN: 'MAIN',
  ANSWER: 'ANSWER'
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      route: ROUTES.MAIN,
      requestEmojis: [],
      responseEmojis: []
    }

    this.lastViewedTimestamp = Date.now()
  }

  componentDidMount () {
    window.addEventListener('compass:show_answer', this.setAnswerScreen)
    window.addEventListener('compass:add_request_emoji', this.addRequestEmoji)
    window.addEventListener('compass:set_response_emoji', this.setResponseEmojis)

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  componentWillUnmount () {
    window.removeEventListener('compass:show_answer', this.setAnswerScreen)
    window.removeEventListener('compass:add_request_emoji', this.addRequestEmoji)
    window.removeEventListener('compass:set_response_emoji', this.setResponseEmojis)

    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  handleVisibilityChange = (event) => {
    if (document.hidden) {
      this.lastViewedTimestamp = Date.now()
    } else {
      if (Date.now() - this.lastViewedTimestamp > IMPATIENCE_TIME_LIMIT && this.state.responseEmojis.length > 0) {
        window.dispatchEvent(new CustomEvent('compass:legacy:cancel_dial_animation'))
        this.setAnswerScreen()
      }
    }
  }

  addRequestEmoji = (event) => {
    this.setState({
      requestEmojis: [...this.state.requestEmojis, event.detail.emoji]
    })
  }

  setResponseEmojis = (event) => {
    this.setState({
      responseEmojis: [...event.detail.responseEmojis]
    })
  }

  resetToInitialState = () => {
    this.setState({
      route: ROUTES.MAIN,
      requestEmojis: [],
      responseEmojis: []
    })
  }

  setAnswerScreen = (event) => {
    this.setState({
      route: ROUTES.ANSWER
    })
  }

  render () {
    switch (this.state.route) {
      case ROUTES.ANSWER:
        return (
          <div id="main">
            <AnswerScreen
              handleAskAnother={this.resetToInitialState}
              requestEmojis={this.state.requestEmojis}
              responseEmojis={this.state.responseEmojis}
            />
          </div>
        )
      case ROUTES.MAIN:
      default:
        return (
          <div id="main">
            <MainScreen
              symbols={symbols}
              requestEmojis={this.state.requestEmojis}
              responseEmojis={this.state.responseEmojis}
              addRequestEmoji={this.addRequestEmoji}
              addResponseEmoji={this.addResponseEmoji}
            />
          </div>
        )
    }
  }
}

export default App
