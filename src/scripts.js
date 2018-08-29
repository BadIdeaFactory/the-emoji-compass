import { TweenLite } from 'gsap'
import Draggable from 'gsap/Draggable'

import symbols from './symbols.json'
import { random, getEmojiPosition, getUniqueRandomIntegers, getRotation } from './utils'

// adjustable values
const DELAY_BETWEEN_PICKS = 1250
const DELAY_AFTER_ALL_PICKS = 450
const DIAL_ROTATION_SPEED = 2.5

let dialsEl
let dial1, dial2, dial3, dial4

let dialAnimation

export function init () {
  dialsEl = document.getElementById('dials')

  dial1 = makeDial('1')
  dial2 = makeDial('2')
  dial3 = makeDial('3')
  dial4 = makeDial('4')

  // Start all dials at a random position
  TweenLite.set(dial1.el, { rotation: random() * 360 })
  TweenLite.set(dial2.el, { rotation: random() * 360 })
  TweenLite.set(dial3.el, { rotation: random() * 360 })
  TweenLite.set(dial4.el, { rotation: random() * 360 })

  dial1.enable()
  window.addEventListener('dial-1:dragend', function (e) {
    dial2.enable()
  })
  window.addEventListener('dial-2:dragend', function (e) {
    dial3.enable()
  })
  window.addEventListener('dial-3:dragend', function (e) {
    autoRotateDial(dial4)
  })

  window.addEventListener('compass:legacy:cancel_dial_animation', function (e) {
    window.cancelAnimationFrame(dialAnimation)
  })
}

function resetToInitialState () {
  // Start all dials at a random position
  TweenLite.set(dial1.el, { rotation: random() * 360 })
  TweenLite.set(dial2.el, { rotation: random() * 360 })
  TweenLite.set(dial3.el, { rotation: random() * 360 })
  TweenLite.set(dial4.el, { rotation: random() * 360 })

  dial2.disable()
  dial3.disable()
  dial4.disable()
  dial1.enable()
}

// Create dials
function makeDial (id) {
  const el = document.createElement('div')
  el.classList.add('dial')
  el.classList.add(`dial-${id}`)
  dialsEl.appendChild(el)

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
  //   onPress: function (e) {
  //     const clickX = e.pageX - dial1.offsetLeft
  //     const clickY = e.pageY - dial1.offsetTop
  //     originX = dial1.getBoundingClientRect().width / 2
  //     originY = dial1.getBoundingClientRect().height / 2     
  //     let clickRotation = Math.atan2(clickY - originY, clickX - originX) * 180 / Math.PI;
  //     if (clickRotation >= -90) {
  //       clickRotation += 90
  //     } else {
  //       clickRotation += 450
  //     }    

  //     TweenMax.set(this.target, { rotation: clickRotation })
  //   },
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
      // Select the emoji it's pointing at.
      const position = onDialPositionUpdate(this.rotation)

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

function onDialPositionUpdate (rotation) {
  const position = getEmojiPosition(rotation, symbols)
 
  window.dispatchEvent(new CustomEvent('compass:show_flavor_text', {
    detail: {
      emoji: symbols[position]
    }
  }))

  // console.log(ringEl.querySelectorAll('li'))
  const allEmojis = document.getElementById('ring').querySelectorAll('li')
  allEmojis.forEach((i) => {
    i.classList.remove('selected')
  })
  allEmojis[position].classList.add('selected')
  return position
}

function rotateDialStep (dial, rotateTo, rotateDirection, resolve) {
  // rotateDirection = 0 => clockwise
  // rotateDirection = 1 => counterclockwise
  let rotated = false

  if (rotateDirection === 0 && dial.draggable.rotation <= rotateTo) {
    TweenLite.set(dial.el, { rotation: dial.draggable.rotation + DIAL_ROTATION_SPEED })
    rotated = true
  } else if (rotateDirection === 1 && dial.draggable.rotation >= rotateTo) {
    TweenLite.set(dial.el, { rotation: dial.draggable.rotation - DIAL_ROTATION_SPEED })
    rotated = true
  }
  
  if (rotated) {
    // Tell the Draggable to calibrate/synchronize/read the current value
    dial.draggable.update()
    onDialPositionUpdate(dial.draggable.rotation)

    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(dial, rotateTo, rotateDirection, resolve)
    })
  } else {
    const position = onDialPositionUpdate(dial.draggable.rotation)

    resolve()
  }
}

function rotatePromise (dial, rotateTo) {
  // rotateDirection = 0 => clockwise
  // rotateDirection = 1 => counterclockwise
  const rotateDirection = Math.round(random()) // 0 or 1.
  const rotateQuantity = Math.ceil(random() * 1) // a number between 1 and 2 inclusive

  // rotation is cumulative so calculate actual ending degrees
  let circs
  if (rotateDirection === 0) {
    // clockwise degrees go up
    circs = Math.ceil(dial.draggable.rotation / 360) + rotateQuantity
  } else {
    // counterclockwise degrees go down
    circs = Math.floor(dial.draggable.rotation / 360) - rotateQuantity
  }
  const rotateToActual = circs * 360 + rotateTo

  return new Promise(function (resolve) {
    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(dial, rotateToActual, rotateDirection, resolve)
    })
  })
}

/**
 * Wrap setTimeout so that it works like a promise
 *
 * @param {Number} delay - in milliseconds
 */
function wait (delay) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, delay)
  })
}

// Have a 4th dial automatically and randomly select 3 more emojis
function autoRotateDial (dial) {
  dial.el.classList.add('active')

  // Make sure the dial picks up its initial position by calling update()
  dial.draggable.update()

  const numberOfSymbols = symbols.length
  const randomNumbers = getUniqueRandomIntegers(numberOfSymbols, 3)
  const responseEmojis = randomNumbers.map((num) => symbols[num])

  window.dispatchEvent(new CustomEvent('compass:set_response_emoji', {
    detail: {
      responseEmojis
    }
  }))

  const rotateTo = getRotation(randomNumbers[0], numberOfSymbols)
  rotatePromise(dial, rotateTo)
    .then(function () { return wait(DELAY_BETWEEN_PICKS) })
    .then(function () {
      const rotateTo = getRotation(randomNumbers[1], numberOfSymbols)
      return rotatePromise(dial, rotateTo)
    })
    .then(function () { return wait(DELAY_BETWEEN_PICKS) })
    .then(function () {
      const rotateTo = getRotation(randomNumbers[2], numberOfSymbols)
      return rotatePromise(dial, rotateTo)
    })
    .then(function () { return wait(DELAY_AFTER_ALL_PICKS) })
    .then(function () {
      window.dispatchEvent(new CustomEvent('compass:show_answer'))
    })
}
