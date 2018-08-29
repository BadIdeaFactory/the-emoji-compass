import React from 'react'
import PropTypes from 'prop-types'
import { TweenLite } from 'gsap'
import Draggable from 'gsap/Draggable'

export default class CompassHand extends React.Component {
  static propTypes = {
    id: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.el = React.createRef()
  }

  componentDidMount () {
    const el = this.el.current

    // Set dial width according to actual circle dimensions
    const circleSize = document.getElementById('ring').getBoundingClientRect().width
    el.style.width = (0.5 * circleSize) + 'px'

    window.addEventListener('resize', function () {
      const circleSize = document.getElementById('ring').getBoundingClientRect().width
      el.style.width = (0.5 * circleSize) + 'px'
    })
  
    // Make dials draggable
    TweenLite.set(el, {
      transformOrigin: '2.5vmin'
    })
  
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
        // flavorTextEl.classList.remove('hidden')
        // instructionTextEl.classList.add('hidden')
      },
      onDrag: function (e) {
        onDialPositionUpdate(this.rotation)
      },
      onDragEnd: function (e) {
        // Select the emoji it's pointing at.
        const position = onDialPositionUpdate(this.rotation)
        requestEmojis.push(symbols[position])
  
        // Disable this when it's done dragging.
        dial.disable()
  
        // Emit an event to let other listeners know about this.
        window.dispatchEvent(new window.CustomEvent(`dial-${id}:dragend`))
      },
      onThrowUpdate: function (e) {
        onDialPositionUpdate(this.rotation)
      }
    })
  
    const dial = {
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
    dial.disable()
  
    return dial
  }

  render () {
    return (
      <div className={`dial dial-${id}`} ref={this.el } />
    )
  }
}
