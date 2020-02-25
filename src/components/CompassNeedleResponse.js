import React, { useRef, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useSpring, animated, config } from 'react-spring'
import { addRequestEmoji, updateNeedlePosition, setActiveNeedle } from '../store/actions/app'
import { random, getUniqueRandomIntegers, getRotation } from '../utils'
import { autoRotateNeedle } from '../scripts'
import symbols from '../symbols.json'
import './CompassNeedle.css'

const INHERENT_NEEDLE_ID = 4
const INHERENT_NEEDLE_TYPE = 'response'

function CompassNeedleResponse (props) {
  const symbols = useSelector(state => state.app.symbols)
  const activeNeedle = useSelector(state => state.app.activeNeedle)
  const dispatch = useDispatch()
  const el = useRef(null)
  const initialRotation = useRef(random() * 360).current // Set at random start position

  // for now auto-rotate 1 number on render.
  const numberOfSymbols = symbols.length
  const randomNumbers = getUniqueRandomIntegers(numberOfSymbols, 3)
  const responseEmojis = randomNumbers.map((num) => symbols[num])
  const rotateTo = getRotation(randomNumbers[0], numberOfSymbols)

  // always take the longest rotate direction between current and destination emoji
  let actualRotateTo = rotateTo
  if (Math.abs(initialRotation - actualRotateTo) < 180) {
    if (initialRotation > actualRotateTo) {
      actualRotateTo = actualRotateTo - 360
    } else {
      actualRotateTo = actualRotateTo + 360
    }
  }

  const { rotateZ } = useSpring({
    from: {
      rotateZ: initialRotation,
      transform: `rotate(${initialRotation}deg)`
    },
    to: {
      rotateZ: (activeNeedle === INHERENT_NEEDLE_ID) ? actualRotateTo : initialRotation,
      transform: `rotate(${actualRotateTo}deg)`
    },
    config: {
      mass: 10,
      tension: 55,
      friction: 31,
    }
  })

  useEffect(() => {
    // Set needle width according to actual circle dimensions
    setElementSize()
    window.addEventListener('resize', setElementSize)
  
    return () => {
      window.removeEventListener('resize', setElementSize)
    }
  })

  function setElementSize () {
    const circleSize = document.getElementById('ring').getBoundingClientRect().width
    const ratio = 0.425
    el.current.style.width = (ratio * circleSize) + 'px'
  }


  return (
    <animated.div
      className="needle needle-response"
      ref={el}
      style={{
        transform: rotateZ.interpolate(z => `rotateZ(${z}deg)`)
      }}
    />
  )
}

export default CompassNeedleResponse
