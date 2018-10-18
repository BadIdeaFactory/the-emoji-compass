import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Symbol from './CompassDialSymbol'
import './CompassDial.css'

class CompassDial extends React.Component {
  static propTypes = {
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    handPosition: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.ringEl = React.createRef()
  }

  componentDidMount () {
    this.repositionSymbols()
    window.addEventListener('resize', this.handleResizeWindow)
  }

  componentDidUpdate () {
    this.repositionSymbols()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResizeWindow)
  }

  handleResizeWindow = (event) => {
    this.repositionSymbols()
  }

  // Create all the emoji items around the compass
  renderSymbols = () => {
    return this.props.symbols.map((symbol, i) => (
      <Symbol
        symbol={symbol}
        key={symbol.emoji}
        className={'compass-dial-emoji' + ((this.props.handPosition === i) ? ' compass-dial-emoji-highlighted' : '')}
      />
    ))
  }

  repositionSymbols = () => {
    const circleSize = this.ringEl.current.getBoundingClientRect().width
    const items = this.ringEl.current.querySelectorAll('.compass-dial-emoji')
    const offset = (circleSize / 2) * .82

    // Add position styling
    items.forEach(function (item, index, symbols) {
      const count = symbols.length
      const angle = 360 / count
      const rotation = index * angle
      item.style.transform = 'rotate(' + rotation + 'deg) translate(' + offset + 'px) rotate(-' + rotation + 'deg)'
    })
  }

  render () {
    return (
      <div className="compass-dial-container">
        <div id="ring" className="compass-dial" ref={this.ringEl}>
          {this.renderSymbols()}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    symbols: state.app.symbols,
    handPosition: state.app.handPosition
  }
}

export default connect(mapStateToProps)(CompassDial)
