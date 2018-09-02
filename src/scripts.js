import { TweenLite } from 'gsap'

import symbols from './symbols.json'
import { random, getUniqueRandomIntegers, getRotation } from './utils'
import store from './store'
import { setResponseEmoji, showAnswerScreen } from './store/actions/app'

// adjustable values
const DELAY_BETWEEN_PICKS = 1250
const DELAY_AFTER_ALL_PICKS = 450
const DIAL_ROTATION_SPEED = 2.5

let dial2, dial3, dial4
let dialAnimation

export function init () {
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

function onDialPositionUpdate (rotation) {
  window.dispatchEvent(new CustomEvent('compass:hand_position_update', {
    detail: { rotation }
  }))
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
    onDialPositionUpdate(dial.draggable.rotation)

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

  store.dispatch(setResponseEmoji(responseEmojis))

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
      store.dispatch(showAnswerScreen())
    })
}
