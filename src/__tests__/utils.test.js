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
