import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TweenLite } from 'gsap'
import Draggable from 'gsap/Draggable'
import { addRequestEmoji, updateHandPosition } from '../store/actions/app'
import { random, getEmojiPosition } from '../utils'

class CompassHand extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    enabled: PropTypes.bool,

    // Provided by Redux
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })),
    addRequestEmoji: PropTypes.func,
    updateHandPosition: PropTypes.func
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

    // Set dial width according to actual circle dimensions
    this.setElementSize()
    window.addEventListener('resize', this.setElementSize)
  
    // Make dials draggable
    TweenLite.set(el, {
      transformOrigin: '2.5vmin',
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
        window.dispatchEvent(new CustomEvent('compass:hand_drag_start'))
      },
      onDrag: (event) => {
        this.props.updateHandPosition(this.draggable[0].rotation)
      },
      onDragEnd: (event) => {
        this.props.updateHandPosition(this.draggable[0].rotation)
  
        // Select the emoji it's pointing at.
        const position = getEmojiPosition(this.draggable[0].rotation, this.props.symbols)

        this.props.addRequestEmoji(this.props.symbols[position])
  
        // Disable this when it's done dragging.
        this.disable()
  
        // Emit an event to let other listeners know about this.
        // window.dispatchEvent(new window.CustomEvent(`dial-${id}:dragend`))
      },
      onThrowUpdate: (event) => {
        this.props.updateHandPosition(this.rotation)
      }
    })
  
    // Each dial starts disabled until enabled later
    if (!this.props.enabled) {
      this.disable()
    } else {
      this.enable()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.enabled && this.props.enabled) {
      this.enable()
    }
    if (prevProps.enabled && !this.props.enabled) {
      this.disable()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setElementSize)
    this.draggable[0].kill()
  }

  setElementSize = () => {
    const circleSize = document.getElementById('ring').getBoundingClientRect().width
    this.el.current.style.width = (0.5 * circleSize) + 'px'
  }
  
  // Wrap Draggable object's `enable()` to make element take z-index priority
  enable = () => {
    const el = this.el.current

    el.classList.add('active')
    TweenLite.set(el, { zIndex: 1 })

    this.draggable[0].enable()
  }

  disable = () => {
    const el = this.el.current

    el.classList.remove('active')
    TweenLite.set(el, { zIndex: 0 })

    this.draggable[0].disable()
    el.style.userSelect = 'none'
    el.style.touchAction = 'none'
  }

  render () {
    return (
      <div className={`dial dial-${this.props.id}`} ref={this.el } />
    )
  }
}

function mapStateToProps (state) {
  return {
    symbols: state.app.symbols
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addRequestEmoji: (emoji) => { dispatch(addRequestEmoji(emoji)) },
    updateHandPosition: (rotation) => { dispatch(updateHandPosition(rotation)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompassHand)
