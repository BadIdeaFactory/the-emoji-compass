
/**
 * Generates a random number between 0 and 1. Uses a
 * cryptographically secure random number generator, if available.
 */
export function random () {
  let rand
  if (window.crypto && Uint8Array) {
    const buf = new Uint8Array(1)
    const arr = window.crypto.getRandomValues(buf)
    rand = arr[0] / 255
  } else {
    rand = Math.random()
  }
  return rand
}

/**
 * Given a degree position around the circle, determine which emoji it
 * is from a list of emojis
 *
 * @param {Number} rotation - degree position on the circle
 * @param {Array(any)} emojis - array of emoji symbols
 * @returns {Number} position in the `emojis` array
 */
export function getEmojiPosition (rotation, emojis) {
  let position
  const modulo = rotation % 360
  if (modulo < 0) {
    position = 360 + modulo
  } else {
    position = modulo
  }
  const range = 360 / emojis.length
  position = Math.round(position / range)
  if (position >= emojis.length) position = 0
  return position
}

/**
 * Generate `amount` of unique random integers between 0 (inclusive)
 * and `upper` bound (exclusive)
 * 
 * getUniqueRandomIntegers(3, 3)
 *      // -> [1, 0, 2]
 *
 * @param {Number} upper - upper bound of random integers
 * @param {Number} amount - number of random integers to generate
 * @returns {Array} of random integers
 */
export function getUniqueRandomIntegers (upper, amount) {
  // Avoid an infinite loop situation in the do-while
  const allowRepeats = upper < amount

  const integers = []
  let i = 0

  do {
    const int = Math.round(random() * (upper - 1))
    if (allowRepeats || !integers.includes(int)) {
      integers.push(int)
      i++
    }
  } while (i < amount)

  return integers
}

/**
* Given `max` number of items evenly spaced around a circle, return
* the number of degrees of the item at `position`
*
* @param {Number} position 
* @param {Number} max
* @returns {Number}
*/
export function getRotation (position, max) {
 return position * (360 / max)
}
