import { TweenLite } from 'gsap'

import symbols from './symbols.json'
import { random, getUniqueRandomIntegers, getRotation } from './utils'
import store from './store'
import { addResponseEmoji, showAnswerScreen, updateNeedlePosition } from './store/actions/app'

// adjustable values
const DELAY_BETWEEN_PICKS = 10
const DELAY_AFTER_ALL_PICKS = 1150
const DIAL_ROTATION_SPEED = 2.5

let dialAnimation

export function init () {
  window.addEventListener('compass:legacy:cancel_dial_animation', function (e) {
    window.cancelAnimationFrame(dialAnimation)
  })
}

function onDialPositionUpdate (rotation) {
  store.dispatch(updateNeedlePosition(rotation))
}

function rotateDialStep (el, draggable, frame, totalFrames, rotateTo, overshoot, rotateDirection, easing, resolve) {
  let rotated = false
  let rotateToOvershoot = rotateTo + overshoot * rotateDirection
  let progress = frame / totalFrames

  if ((rotateDirection === 1 && draggable.rotation <= rotateToOvershoot)
   || (rotateDirection === -1 && draggable.rotation >= rotateToOvershoot)) {
    TweenLite.set(el, { rotation: draggable.rotation + DIAL_ROTATION_SPEED * easing(progress) * rotateDirection })
    rotated = true
  }

  if (rotated) {
    // Tell the Draggable to calibrate/synchronize/read the current value
    draggable.update()
    onDialPositionUpdate(draggable.rotation)

    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(el, draggable, frame + 1, totalFrames, rotateTo, overshoot, rotateDirection, easing, resolve)
    })
  } else if (overshoot !== 0) {
    // Tell the Draggable to calibrate/synchronize/read the current value
    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(el, draggable, 0, 10, rotateTo, Math.trunc(overshoot / 2), rotateDirection * -1, (t) => t * t , resolve)
    })
  } else {
    onDialPositionUpdate(draggable.rotation)

    resolve()
  }
}

function rotatePromise (el, draggable, rotateTo) {
  // rotateDirection = 1 => clockwise
  // rotateDirection = -1 => counterclockwise
  const rotateDirection = Math.round(random()) ? 1 : -1
  const rotateQuantity = Math.ceil(random()) // a number between 1 and 2 inclusive
  const overshoot = 5 + Math.ceil(random() * 5) // Number of degrees to overshoot

  // rotation is cumulative so calculate actual ending degrees
  let circs = Math.floor(draggable.rotation / 360) + rotateQuantity * rotateDirection
  const rotateToActual = circs * 360 + rotateTo
  const rotateToOvershoot = rotateToActual + overshoot * rotateDirection
  const duration = Math.abs(draggable.rotation - rotateToOvershoot) / 200 * 60 // 200 degrees per second on average

  return new Promise(function (resolve) {
    let easing = (t) => (t < rotateToActual / rotateToOvershoot) ? (16 * t * t * t * t * t) : (1 + 16 * (--t) * t * t * t * t)
    dialAnimation = window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(el, draggable, 0, duration, rotateToActual, overshoot, rotateDirection, easing, resolve)
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
export function autoRotateNeedle (dial) {
  const el = dial.el.current
  const draggable = dial.draggable[0]

  el.classList.add('active')

  // Make sure the dial picks up its initial position by calling update()
  draggable.update()

  const numberOfSymbols = symbols.length
  const randomNumbers = getUniqueRandomIntegers(numberOfSymbols, 3)
  const responseEmojis = randomNumbers.map((num) => symbols[num])

  const rotateTo = getRotation(randomNumbers[0], numberOfSymbols)

  rotatePromise(el, draggable, rotateTo)
    .then(function () {
      store.dispatch(addResponseEmoji(responseEmojis[0]))
      return wait(DELAY_BETWEEN_PICKS)
    })
    .then(function () {
      const rotateTo = getRotation(randomNumbers[1], numberOfSymbols)
      return rotatePromise(el, draggable, rotateTo)
    })
    .then(function () {
      store.dispatch(addResponseEmoji(responseEmojis[1]))
      return wait(DELAY_BETWEEN_PICKS)
    })
    .then(function () {
      const rotateTo = getRotation(randomNumbers[2], numberOfSymbols)
      return rotatePromise(el, draggable, rotateTo)
    })
    .then(function () {
      store.dispatch(addResponseEmoji(responseEmojis[2]))
      return wait(DELAY_AFTER_ALL_PICKS)
    })
    .then(function () {
      store.dispatch(showAnswerScreen())
    })
}
