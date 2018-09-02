import { TweenLite } from 'gsap'

import symbols from './symbols.json'
import { random, getUniqueRandomIntegers, getRotation } from './utils'
import store from './store'
import { setResponseEmoji, showAnswerScreen, updateHandPosition } from './store/actions/app'

// adjustable values
const DELAY_BETWEEN_PICKS = 1250
const DELAY_AFTER_ALL_PICKS = 450
const DIAL_ROTATION_SPEED = 2.5

let dialAnimation

export function init () {
  window.addEventListener('compass:legacy:cancel_dial_animation', function (e) {
    window.cancelAnimationFrame(dialAnimation)
  })
}

function onDialPositionUpdate (rotation) {
  store.dispatch(updateHandPosition(rotation))
}

function rotateDialStep (el, draggable, rotateTo, rotateDirection, resolve) {
  // rotateDirection = 0 => clockwise
  // rotateDirection = 1 => counterclockwise
  let rotated = false

  if (rotateDirection === 0 && draggable.rotation <= rotateTo) {
    TweenLite.set(el, { rotation: draggable.rotation + DIAL_ROTATION_SPEED })
    rotated = true
  } else if (rotateDirection === 1 && draggable.rotation >= rotateTo) {
    TweenLite.set(el, { rotation: draggable.rotation - DIAL_ROTATION_SPEED })
    rotated = true
  }
  
  if (rotated) {
    // Tell the Draggable to calibrate/synchronize/read the current value
    draggable.update()
    onDialPositionUpdate(draggable.rotation)

    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(el, draggable, rotateTo, rotateDirection, resolve)
    })
  } else {
    onDialPositionUpdate(draggable.rotation)

    resolve()
  }
}

function rotatePromise (el, draggable, rotateTo) {
  // rotateDirection = 0 => clockwise
  // rotateDirection = 1 => counterclockwise
  const rotateDirection = Math.round(random()) // 0 or 1.
  const rotateQuantity = Math.ceil(random() * 1) // a number between 1 and 2 inclusive

  // rotation is cumulative so calculate actual ending degrees
  let circs
  if (rotateDirection === 0) {
    // clockwise degrees go up
    circs = Math.ceil(draggable.rotation / 360) + rotateQuantity
  } else {
    // counterclockwise degrees go down
    circs = Math.floor(draggable.rotation / 360) - rotateQuantity
  }
  const rotateToActual = circs * 360 + rotateTo

  return new Promise(function (resolve) {
    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(el, draggable, rotateToActual, rotateDirection, resolve)
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
export function autoRotateDial (dial) {
  const el = dial.el.current
  const draggable = dial.draggable[0]

  el.classList.add('active')

  // Make sure the dial picks up its initial position by calling update()
  draggable.update()

  const numberOfSymbols = symbols.length
  const randomNumbers = getUniqueRandomIntegers(numberOfSymbols, 3)
  const responseEmojis = randomNumbers.map((num) => symbols[num])

  store.dispatch(setResponseEmoji(responseEmojis))

  const rotateTo = getRotation(randomNumbers[0], numberOfSymbols)

  rotatePromise(el, draggable, rotateTo)
    .then(function () { return wait(DELAY_BETWEEN_PICKS) })
    .then(function () {
      const rotateTo = getRotation(randomNumbers[1], numberOfSymbols)
      return rotatePromise(el, draggable, rotateTo)
    })
    .then(function () { return wait(DELAY_BETWEEN_PICKS) })
    .then(function () {
      const rotateTo = getRotation(randomNumbers[2], numberOfSymbols)
      return rotatePromise(el, draggable, rotateTo)
    })
    .then(function () { return wait(DELAY_AFTER_ALL_PICKS) })
    .then(function () {
      store.dispatch(showAnswerScreen())
    })
}
