import { getEmojiPosition, getUniqueRandomIntegers, getRotation } from '../utils'

describe('getEmojiPosition()', () => {
  it('gets an emoji position', () => {
    const rotation = 90
    const emojis = new Array(20)
    const result = getEmojiPosition(rotation, emojis)
    expect(result).toEqual(5)
  })

  it('gets an emoji position for degrees exceeding 360', () => {
    const rotation = 360 + 180
    const emojis = new Array(36)
    const result = getEmojiPosition(rotation, emojis)
    expect(result).toEqual(18)
  })

  it('gets an emoji position for degrees that are negative numbers', () => {
    const rotation = -90
    const emojis = new Array(36)
    const result = getEmojiPosition(rotation, emojis)
    expect(result).toEqual(27)
  })

  it('gets an emoji position for degree that equals zero', () => {
    const rotation = 0
    const emojis = new Array(12)
    const result = getEmojiPosition(rotation, emojis)
    expect(result).toEqual(0)
  })
})

describe('getUniqueRandomIntegers', () => {
  it('generates 10 random numbers between 0 and 3', () => {
    const ARRAY_LENGTH = 10
    const UPPER_BOUND = 3
    const result = getUniqueRandomIntegers(UPPER_BOUND, ARRAY_LENGTH)
    expect(Array.isArray(result)).toEqual(true)
    expect(result.length).toEqual(ARRAY_LENGTH)

    // We need to test each value of the resulting array to make sure
    // it is greater than or equal to 0, and less than the upper bound.
    // We use Array.prototype.reduce() to check each value. If a value
    // is found to be outside the bounds, return false, and continue to
    // return false for the duration of the reduce().
    let isInBounds = true
    for (let i = 0; i < result.length; i++) {
      if (result[i] < 0 || result[i] >= UPPER_BOUND) {
        isInBounds = false
        break
      }
    }

    expect(isInBounds).toEqual(true)
  })
})

describe('getRotation', () => {
  it('gets the rotation', () => {
    const result = getRotation(4, 36)
    expect(result).toEqual(40)
  })

  it('gets the rotation when position is zero', () => {
    const result = getRotation(0, 36)
    expect(result).toEqual(0)
  })
})
