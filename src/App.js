import React, { Component } from 'react'
import MainScreen from './components/MainScreen'
import AnswerScreen from './components/AnswerScreen'
import symbols from './symbols.json'

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
  }

  componentDidMount () {
    window.addEventListener('compass:show_answer', this.setAnswerScreen)
  }

  componentWillUnmount () {
    window.removeEventListener('compass:show_answer', this.setAnswerScreen)
  }

  addRequestEmoji = (emoji) => {
    this.setState({
      requestEmojis: [...this.state.requestEmojis, emoji]
    })
  }

  addResponseEmoji = (emoji) => {
    this.setState({
      responseEmojis: [...this.state.responseEmojis, emoji]
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
      route: ROUTES.ANSWER,
      requestEmojis: event.detail.requestEmojis,
      responseEmojis: event.detail.responseEmojis
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
