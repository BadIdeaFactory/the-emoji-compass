import React, { Component } from 'react'
import AnswerScreen from './components/AnswerScreen'
import { init } from './scripts'

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
    init()
  }

  resetToInitialState = () => {
    this.setState({ route: ROUTES.MAIN })
  }

  renderAnswerScreen = () => {
    if (this.state.route === ROUTES.ANSWER) {
      return (
        <AnswerScreen
          handleAskAnother={this.resetToInitialState}
          requestEmojis={this.state.requestEmojis}
          responseEmojis={this.state.responseEmojis}
        />
      )
    }
  }

  render () {
    return (
      <div id="main">
        <div className="container">
          <div id="compass" className="compass-container">
            <div className="ring-container">
              <ul id="ring" className="ring"></ul>
            </div>
            <div className="dials-container">
              <div id="dials">
                <div className="dials-cap"></div>
              </div>
            </div>
          </div>
          <div className="text-container">
            <hr />
            <div className="text-box instruction-text">
            </div>
            <div className="text-box flavor-text hidden">
              <div id="emoji-output"></div>
              <div id="flavor-text-output"></div>
            </div>
          </div>
        </div>
        {this.renderAnswerScreen()}
      </div>
    )
  }
}

export default App
