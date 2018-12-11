import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ROUTES } from './constants'
import { showAnswerScreen } from './store/actions/app'
import MainScreen from './components/MainScreen'
import AnswerScreen from './components/AnswerScreen'
import InfoButton from './components/InfoButton'
import InfoOverlay from './components/InfoOverlay'

// If a viewer tabs away or minimizes the browser, and returns after
// this amount of time, fast forward to final screen instead of
// continuing with the animation. Value is stored as milliseconds.
const IMPATIENCE_TIME_LIMIT = 1000 //20000

class App extends Component {
  static propTypes = {
    route: PropTypes.string,
    responseEmojis: PropTypes.array
  }

  constructor(props) {
    super(props)

    this.state = {
      infoVisible: false
    }

    this.lastViewedTimestamp = Date.now()
  }

  componentDidMount () {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  componentWillUnmount () {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  showInfoOverlay = () => {
    this.setState({
      infoVisible: true
    })
  }

  hideInfoOverlay = () => {
    this.setState({
      infoVisible: false
    })
  }

  handleVisibilityChange = (event) => {
    if (document.hidden) {
      this.lastViewedTimestamp = Date.now()
    } else {
      if (Date.now() - this.lastViewedTimestamp > IMPATIENCE_TIME_LIMIT && this.props.responseEmojis.length > 0) {
        this.props.showAnswerScreen()
      }
    }
  }

  render () {
    let screen
    switch (this.props.route) {
      case ROUTES.ANSWER:
        screen = <AnswerScreen />
        break
      case ROUTES.MAIN:
      default:
        screen = <MainScreen />
        break
    }

    return (
      <main role="main">
        {screen}
        <InfoButton handler={this.showInfoOverlay} />
        {this.state.infoVisible && <InfoOverlay handler={this.hideInfoOverlay} />}
      </main>
    )
  }
}

function mapStateToProps (state) {
  return {
    route: state.app.route,
    responseEmojis: state.app.responseEmojis
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showAnswerScreen: () => { dispatch(showAnswerScreen) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
