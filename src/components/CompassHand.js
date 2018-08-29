import React from 'react'
import PropTypes from 'prop-types'
import { TweenLite } from 'gsap'
import Draggable from 'gsap/Draggable'
import { random, getEmojiPosition } from '../utils'

function onDialPositionUpdate (rotation) {
  window.dispatchEvent(new CustomEvent('compass:hand_position_update', {
    detail: { rotation }
  }))
}

export default class CompassHand extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    enabled: PropTypes.bool,
    symbols: PropTypes.arrayOf(PropTypes.shape({
      emoji: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    }))
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
        onDialPositionUpdate(this.draggable[0].rotation)
      },
      onDragEnd: (event) => {
        onDialPositionUpdate(this.draggable[0].rotation)
  
        // Select the emoji it's pointing at.
        const position = getEmojiPosition(this.draggable[0].rotation, this.props.symbols)
        window.dispatchEvent(new CustomEvent('compass:add_request_emoji', {
          detail: {
            emoji: this.props.symbols[position]
          }
        }))
  
        // Disable this when it's done dragging.
        this.disable()
  
        // Emit an event to let other listeners know about this.
        // window.dispatchEvent(new window.CustomEvent(`dial-${id}:dragend`))
      },
      onThrowUpdate: (event) => {
        onDialPositionUpdate(this.rotation)
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
