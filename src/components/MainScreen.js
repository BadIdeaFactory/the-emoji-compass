import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Compass from './Compass'
import MainTextDisplay from './MainTextDisplay'
import { init } from '../scripts'
import './MainScreen.css'

class MainScreen extends React.Component {
  static propTypes = {
    requestEmojis: PropTypes.array
  }

  componentDidMount () {
    init()
  }

  render () {
    return (
      <div className="container">
        <Compass />
        <div className="emoji-requested">
          {this.props.requestEmojis.map((symbol, i) => (
            <span key={i}>
              {symbol.emoji}
            </span>
          ))}
        </div>
        <MainTextDisplay />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    requestEmojis: state.app.requestEmojis
  }
}

export default connect(mapStateToProps)(MainScreen)
