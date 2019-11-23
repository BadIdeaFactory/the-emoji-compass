import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { addRequestEmoji, updateNeedlePosition, setActiveNeedle } from '../store/actions/app'
import { random, getEmojiPosition } from '../utils'
import { autoRotateNeedle } from '../scripts'
import './CompassNeedle.css'

gsap.registerPlugin(Draggable)

class CompassNeedle extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['request', 'response']).isRequired,
    enabled: PropTypes.bool,

    // Provided by Redux
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    activeNeedle: PropTypes.number,
    addRequestEmoji: PropTypes.func,
    updateNeedlePosition: PropTypes.func
  }

  static defaultProps = {
    addRequestEmoji: () => {}
  }

  constructor (props) {
    super(props)

    this.el = React.createRef()
    this.draggable = null
  }

  componentDidMount () {
    const el = this.el.current

    // Set needle width according to actual circle dimensions
    this.setElementSize()
    window.addEventListener('resize', this.setElementSize)
  
    // Make needles draggable
    gsap.set(el, {
      transformOrigin: '2.0vmin',
      rotation: random() * 360 // Set at random start position
    })

    this.draggable = Draggable.create(el, {
      type: 'rotation',
      sticky: true,
      throwProps: true,
      // Only if ThrowProps is available
      snap: {
        rotation: (value) => {
          const increment = 360 / this.props.symbols.length
          return Math.round(value / increment) * increment
        }
      },
      // Set scope of Draggable callback functions to this component.
      callbackScope: this,
      onDragStart: (event) => {
        window.dispatchEvent(new CustomEvent('compass:needle_drag_start'))
      },
      onDrag: (event) => {
        this.props.updateNeedlePosition(this.draggable[0].rotation)
      },
      onDragEnd: (event) => {
        this.props.updateNeedlePosition(this.draggable[0].rotation)
  
        // Select the emoji it's pointing at.
        const position = getEmojiPosition(this.draggable[0].rotation, this.props.symbols)

        this.props.addRequestEmoji(this.props.symbols[position])
  
        // Disable this when it's done dragging.
        this.disable()
  
        // Set the active needle to the next needle.
        this.props.setActiveNeedle(this.props.id + 1)
      },
      onThrowUpdate: (event) => {
        this.props.updateNeedlePosition(this.rotation)
      }
    })
  
    // Activate if this is the currently active needle.
    if (this.props.activeNeedle === this.props.id) {
      this.enable()
    } else {
      this.disable()
    }
  }

  componentDidUpdate (prevProps) {
    // Activate if this is the currently active needle.
    if (this.props.activeNeedle === this.props.id) {
      // The response needle will spin automatically
      if (this.props.type === 'response') {
        autoRotateNeedle(this)
      } else {
        this.enable()
      }
    } else {
      this.disable()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setElementSize)
    this.draggable[0].kill()
  }

  setElementSize = () => {
    const circleSize = document.getElementById('ring').getBoundingClientRect().width
    const ratio = (this.props.type === 'response') ? 0.425 : 0.355
    this.el.current.style.width = (ratio * circleSize) + 'px'
  }

  // Wrap Draggable object's `enable()` to make element take z-index priority
  enable = () => {
    const el = this.el.current

    el.classList.add('needle-active')
    gsap.set(el, { zIndex: 1 })

    this.draggable[0].enable()
  }

  disable = () => {
    const el = this.el.current

    el.classList.remove('needle-active')
    gsap.set(el, { zIndex: 0 })

    this.draggable[0].disable()
    el.style.userSelect = 'none'
    el.style.touchAction = 'none'
  }

  render () {
    return (
      <div className={`needle needle-${this.props.type}`} ref={this.el } />
    )
  }
}

function mapStateToProps (state) {
  return {
    symbols: state.app.symbols,
    activeNeedle: state.app.activeNeedle
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addRequestEmoji: (emoji) => { dispatch(addRequestEmoji(emoji)) },
    updateNeedlePosition: (rotation) => { dispatch(updateNeedlePosition(rotation)) },
    setActiveNeedle: (needleId) => { dispatch(setActiveNeedle(needleId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompassNeedle)
