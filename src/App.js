import React, { Component } from 'react'

const ROUTES = {
  MAIN: 'MAIN',
  ANSWER: 'ANSWER'
}

class App extends Component {
  constructor(props) {
    this.state = {
      route: ROUTE.MAIN,
      requestEmojis: [],
      responseEmojis: []
    }
  }

  resetToInitialState = () => {
    this.setState({ route: ROUTE.MAIN })
  }

  renderAnswerScreen = () => {
    if (this.state.route === ROUTE.ANSWER) {
      return (
        <AnswerScreen
          handleAskAnother={resetToInitialState}
          requestEmojis={requestEmojis}
          responseEmojis={responseEmojis}
        />
      )
    }
  }

  render () {
    return (
      <div id="main">
        <div class="container">
          <div id="compass" class="compass-container">
            <div class="ring-container">
              <ul id="ring" class="ring"></ul>
            </div>
            <div class="dials-container">
              <div id="dials">
                <div class="dials-cap"></div>
              </div>
            </div>
          </div>
          <div class="text-container">
            <hr />
            <div class="text-box instruction-text">
            </div>
            <div class="text-box flavor-text hidden">
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
