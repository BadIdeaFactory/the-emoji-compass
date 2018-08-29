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
    this.dial = null
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

    const { id, symbols } = this.props
    const dial = this.dial
  
    const draggable = Draggable.create(el, {
      type: 'rotation',
      sticky: true,
      throwProps: true,
      // Only if ThrowProps is available
      snap: {
        rotation: function (value) {
          const increment = 360 / symbols.length
          return Math.round(value / increment) * increment
        }
      },
      onDragStart: function (e) {
        window.dispatchEvent(new CustomEvent('compass:hand_drag_start'))
      },
      onDrag: function (e) {
        onDialPositionUpdate(this.rotation)
      },
      onDragEnd: function (e) {
        onDialPositionUpdate(this.rotation)
  
        // Select the emoji it's pointing at.
        const position = getEmojiPosition(this.rotation, symbols)
        window.dispatchEvent(new CustomEvent('compass:add_request_emoji', {
          detail: {
            emoji: symbols[position]
          }
        }))
  
        // Disable this when it's done dragging.
        dial.disable()
  
        // Emit an event to let other listeners know about this.
        window.dispatchEvent(new window.CustomEvent(`dial-${id}:dragend`))
      },
      onThrowUpdate: function (e) {
        onDialPositionUpdate(this.rotation)
      }
    })
  
    this.dial = {
      el,
      draggable: draggable[0],
      // Wrap original `enable()` to make element take z-index priority
      enable: function () {
        el.classList.add('active')
        TweenLite.set(el, { zIndex: 1 })
        draggable[0].enable()
      },
      // Wrap original `disable()` to make element keep non-selectable style
      disable: function () {
        el.classList.remove('active')
        TweenLite.set(el, {zIndex: 0 })
        draggable[0].disable()
        el.style.userSelect = 'none'
        el.style.touchAction = 'none'
      }
    }
  
    // Each dial starts disabled until enabled later
    if (!this.props.enabled) {
      this.dial.disable()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.enabled && this.props.enabled) {
      this.dial.enable()
    }
    if (prevProps.enabled && !this.props.enabled) {
      this.dial.disable()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setElementSize)
  }

  setElementSize = () => {
    const circleSize = document.getElementById('ring').getBoundingClientRect().width
    this.el.current.style.width = (0.5 * circleSize) + 'px'
  }

  render () {
    return (
      <div className={`dial dial-${this.props.id}`} ref={this.el } />
    )
  }
}
