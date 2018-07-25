const symbols = [
  {
    emoji: '🐘',
    title: 'Elephant',
    text: 'Africa terra. Charity offered. Continence maintained.'
  },
  {
    emoji: 'αΩ',
    title: 'Alpha and Omega',
    text: 'Finality speaks. Consider process. Inevitability listens.'
  },
  {
    emoji: '😇',
    title: 'Angel',
    text: 'A messenger arrives. Hierarchy provides structure, but disobedience lingers.'
  },
  {
    emoji: '🐜',
    title: 'Ant',
    text: 'Steady and rote phsyical labor progresses. Diligence, tested by tedium.'
  },
  {
    emoji: '🍏',
    title: 'Apple',
    text: 'A sensation of juicy sin. The tart gift of knowledge, the rot of polished vanity.'
  },
  {
    emoji: '👶',
    title: 'Baby',
    text: 'The future is embodied in the present. A universe of malleable options, but also, helplessness.'
  },
  {
    emoji: '🐝',
    title: 'Beehive',
    text: 'A productive hive is a locus of work. Sweetness is gathered. Beams of light.'
  },
  {
    emoji: '🐦',
    title: 'Bird',
    text: 'A soul, a dæmon, flutters. Spring rejuvenates. Marriage bonds.'
  },
  {
    emoji: '🍞',
    title: 'Bread',
    text: 'Nourishment is provided. Christ\'s corpus. Sacrifice made.'
  },
  {
    emoji: '🐮',
    title: 'Bull',
    text: 'Fertile earth. Unbridled power bucks. Raw honesty charges.'
  },
  {
    emoji: '🐫',
    title: 'Camel',
    text: 'Asian expanse. Summer ripeness. Perseverance on journeys.'
  }, 
  {
    emoji: '🕯️',
    title: 'Candle',
    text: 'Fire\'s life. Faith steadily vigilant. Illumination of mind.'
  }, 
  {
    emoji: '🍲',
    title: 'Cauldron (crucible)',
    text: 'Alchemy reconfigures. A craft practiced. A potent blend of archived wisdom.'
  }, 
  {
    emoji: '🦎',
    title: 'Chameleon',
    text: 'Open air. Green with greed. Patience waits still in focus.'
  }, 
  {
    emoji: '💠',
    title: 'Compass',
    text: 'Measurement quantifies. Mathematics solve. Science progessively orientates.'
  }, 
  {
    emoji: '🎉',
    title: 'Cornucopia',
    text: 'A great wealth of resource. Autumn\'s harvest provides. Hospitality welcomes.'
  }, 
  {
    emoji: '🐊',
    title: 'Crocodile',
    text: 'The Americas. Sly marauding. Enterprise.'
  },   
  {
    emoji: '🐬',
    title: 'Dolphin',
    text: 'Fluid water. Resurrection surges. Succor comes to the rescue.'
  },   
  {
    emoji: '⚓',
    title: 'Anchor',
    text: 'Hope floats. Steadfast currents prevail. Prevention tethers. Hear the sea.'
  },   
  {
    emoji: '🌐',
    title: 'Globe',
    text: 'Politics traded. Sovereignty reigns. The circumference of fame.'
  },   
  {
    emoji: '🦅',
    title: 'Griffin',
    text: 'The griffin\'s treasure. Vigilant watchfullness presides. Courage soars.'
  },   
  {
    emoji: '⛑️',
    title: 'Helmet',
    text: 'War threatens. Protection shields. An open view is narrowed.'
  },   
  {
    emoji: '🐎',
    title: 'Horse',
    text: 'Europa. Journeys traversed. Fidelity rides true.'
  },   
  {
    emoji: '⏳',
    title: 'Hourglass',
    text: 'Time, too, will change. Death the constant. Change everlasting. The present now.'
  },   
  {
    emoji: '🎸',
    title: 'Lute',
    text: 'Rhythmic poetry. The melody of rhetoric. Philosophy\'s chords strummed.'
  },   
  {
    emoji: '🤱',
    title: 'Madonna',
    text: 'Motherhood begets life. The feminine energy. Worship.'
  },   
  {
    emoji: '🎎',
    title: 'Marionette',
    text: 'The marionette\'s tethered obedience. Submission. The grace of weightless dance.'
  },   
  {
    emoji: '🌕',
    title: 'Moon',
    text: 'Pure chastity. Hanging mystery. Eliciting the uncanny.'
  },   
  {
    emoji: '🦉',
    title: 'Owl',
    text: 'The span of night. Winter\'s stillness. Prey\'s frozen fear.'
  },   
  {
    emoji: '🐍',
    title: 'Serpent',
    text: 'Cunning and unpredictable evil. Striking guile. Eons of remembered wisdom.'
  },   
  {
    emoji: '☀️',
    title: 'Sun',
    text: 'The transit of daytime. Overriding authority. Radiating truth. Energetic intellect.'
  },   
  {
    emoji: '⚔️',
    title: 'Sword',
    text: 'Justice brought. Physical fortitude. The Catholic Church.'
  },   
  {
    emoji: '⚡',
    title: 'Thunderbolt',
    text: 'A crackling of inspiration. Established fate. A horizon of chance.'
  },   
  {
    emoji: '🌳',
    title: 'Tree',
    text: 'A firm and solid trunk. Its canopy of shelter offered. Fertility sprouts forth.'
  },   
  {
    emoji: '🌱',
    title: 'Walled Garden',
    text: 'Nature lives. Innocence protected. Order kept.'
  },   
  {
    emoji: '👹',
    title: 'Wild Man',
    text: 'A wild man ranges. The Masculine energy. Lust drives forward.'
  }
]

// adjustable values
const DELAY_BETWEEN_PICKS = 1250
const DELAY_AFTER_ALL_PICKS = 450
const DIAL_ROTATION_SPEED = 2.5

// If a viewer tabs away or minimizes the browser, and returns after
// this amount of time, fast forward to final screen instead of
// continuing with the animation. Value is stored as milliseconds.
const IMPATIENCE_TIME_LIMIT = 20000

const ringEl = document.getElementById('ring')
const dialsEl = document.getElementById('dials')
const compassEl = document.getElementById('compass')
const flavorTextOutputEl = document.getElementById('flavor-text-output')
const flavorTextEl = document.querySelector('.flavor-text')
const instructionTextEl = document.querySelector('.instruction-text')
const emojiOutputEl = document.getElementById('emoji-output')
const requestEmojis = []
const responseEmojis = []

let dial1, dial2, dial3, dial4
let lastViewedTimestamp = Date.now()

function init () {
  resetInstructions()
  repositionRing()
  renderSymbols()
  window.addEventListener('resize', function (e) {
    repositionRing()
    repositionSymbols()
  })

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
    showInstructions()
  })
  window.addEventListener('dial-2:dragend', function (e) {
    dial3.enable()
    showInstructions()
  })
  window.addEventListener('dial-3:dragend', function (e) {
    autoRotateDial(dial4)
  })

  document.getElementById('ask-another').addEventListener('click', resetToInitialState)

  document.addEventListener('visibilitychange', handleVisibilityChange)
}

function handleVisibilityChange () {
  if (document.hidden) {
    lastViewedTimestamp = Date.now()
  } else {
    if (Date.now() - lastViewedTimestamp > IMPATIENCE_TIME_LIMIT && responseEmojis.length > 0) {
      displayFinalScreen(requestEmojis, responseEmojis)
    }
  }
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

  while (requestEmojis.length > 0) {
    requestEmojis.pop()
  }
  while (responseEmojis.length > 0) {
    responseEmojis.pop()
  }

  resetInstructions()
  document.querySelector('.final-text').classList.add('hidden')
  document.querySelector('.instruction-text').classList.remove('hidden')
}

/**
 * Generates a random number between 0 and 1. Uses a
 * cryptographically secure random number generator, if available.
 */
function random () {
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

function repositionRing () {
  const dims = compassEl.getBoundingClientRect()
  const max = Math.min(dims.width, dims.height)
  const actual = 0.8 * max
  ringEl.style.height = actual + 'px'
  ringEl.style.width = actual + 'px'
}

// Create all the emoji items around the compass
function renderSymbols () {
  symbols.forEach(function (symbol, index, symbols) {
    const li = document.createElement('li')
    const inner = document.createElement('span')
    inner.innerText = symbol.emoji
    li.appendChild(inner)
    ringEl.appendChild(li)
  })
  repositionSymbols()
}

function repositionSymbols () {
  const circleSize = ringEl.getBoundingClientRect().width
  const items = ringEl.querySelectorAll('li')

  // Add position styling
  items.forEach(function (item, index, symbols) {
    const count = symbols.length
    const angle = 360 / count
    const rotation = index * angle
    item.style.transform = 'rotate(' + rotation + 'deg) translate(' + circleSize / 2 + 'px) rotate(-' + rotation + 'deg)'
  })
}

// Create dials
function makeDial (id) {
  const el = document.createElement('div')
  el.classList.add('dial')
  el.classList.add(`dial-${id}`)
  dialsEl.appendChild(el)

  // Set dial width according to actual circle dimensions
  const circleSize = ringEl.getBoundingClientRect().width
  el.style.width = (0.5 * circleSize) + 'px'
  window.addEventListener('resize', function () {
    const circleSize = ringEl.getBoundingClientRect().width
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
      flavorTextEl.classList.remove('hidden')
      instructionTextEl.classList.add('hidden')
    },
    onDrag: function (e) {
      onDialPositionUpdate(this.rotation)
    },
    onDragEnd: function (e) {
      // Select the emoji it's pointing at.
      const emoji = onDialPositionUpdate(this.rotation)
      requestEmojis.push(emoji)

      if (id === '4') console.log(emoji)
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
  emojiOutputEl.textContent = symbols[position].emoji
  flavorTextOutputEl.textContent = symbols[position].text
  // console.log(ringEl.querySelectorAll('li'))
  const allEmojis = ringEl.querySelectorAll('li')
  allEmojis.forEach((i) => {
    i.classList.remove('selected')
  })
  allEmojis[position].classList.add('selected')
  return symbols[position]
}

function getEmojiPosition (rotation, emojis) {
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

function showInstructions () {
  flavorTextEl.classList.add('hidden')
  instructionTextEl.textContent = 'Drag the next dial to select the next emoji.'
  instructionTextEl.classList.remove('hidden')
}

function resetInstructions () {
  flavorTextEl.classList.add('hidden')
  instructionTextEl.textContent = 'To ask a question of the compass, rotate the highlighted dial.'
  instructionTextEl.classList.remove('hidden')
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
function getUniqueRandomIntegers (upper, amount) {
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
function getRotation (position, max) {
  return position * (360 / max)
}

function rotateDialStep (dial, rotateTo, rotateDirection, rotateQuantity, resolve) {
  // rotateDirection = 0 => clockwise
  // rotateDirection = 1 => counterclockwise
  let rotated = false
  const quantity = 360 * rotateQuantity

  if (rotateDirection === 0 && dial.draggable.rotation <= rotateTo + quantity) {
    TweenLite.set(dial.el, { rotation: dial.draggable.rotation + DIAL_ROTATION_SPEED })
    rotated = true
  } else if (rotateDirection === 1 && dial.draggable.rotation >= rotateTo - quantity) {
    TweenLite.set(dial.el, { rotation: dial.draggable.rotation - DIAL_ROTATION_SPEED })
    rotated = true
  }
  
  if (rotated) {
    // Tell the Draggable to calibrate/synchronize/read the current value
    dial.draggable.update()
    onDialPositionUpdate(dial.draggable.rotation)

    window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(dial, rotateTo, rotateDirection, rotateQuantity, resolve)
    })
  } else {
    onDialPositionUpdate(dial.draggable.rotation)
    resolve()
  }
}

function rotatePromise (dial, rotateTo) {
  const rotateDirection = Math.round(random()) // 0 or 1.
  const rotateQuantity = random() * 2 + 1 // a number between 1 and 3 inclusive, fractional allowed

  return new Promise(function (resolve) {
    window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(dial, rotateTo, rotateDirection, rotateQuantity, resolve)
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
  
  randomNumbers.forEach(function (num) {
    responseEmojis.push(symbols[num])
  })

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
      displayFinalScreen(requestEmojis, responseEmojis)
    })
}

function displayFinalScreen (requestEmojis, responseEmojis) {
  flavorTextEl.classList.add('hidden')
  const finalEl = document.querySelector('.final-text')

  // show user selected emoji
  const emoji1El = document.getElementById('final-emoji-1')
  const emoji1 = requestEmojis.map(function(i) { return i.emoji }).join(' ')
  emoji1El.textContent = emoji1

  // show randomly selected emoji
  const emoji2El = document.getElementById('final-emoji-2')
  const emojiTable = generateEmojiTable(responseEmojis)
  // remove contents of emoji2
  while (emoji2El.firstChild) {
    emoji2El.removeChild(emoji2El.firstChild);
  }
  // then append the table
  emoji2El.appendChild(emojiTable)

  finalEl.classList.remove('hidden')
}

/**
 * Returns a table of emojis and their meaning inside of a document
 * fragment, ready to be appended to DOM.
 *
 * @param {array} emoji objects - { symbol, title, text }
 * @returns {HTMLDocumentFragment}
 */
function generateEmojiTable (emojis) {
  const el = document.createDocumentFragment()
  const tableEl = document.createElement('table')
  const tbodyEl = document.createElement('tbody')
  tableEl.appendChild(tbodyEl)
  tableEl.className = 'emoji-table'
  el.appendChild(tableEl)

  emojis.forEach(function (emoji) {
    const rowEl = document.createElement('tr')
    rowEl.className = 'emoji-table-row'

    const emojiCellEl = document.createElement('td')
    const emojiEl = document.createElement('span')
    emojiEl.className = 'emoji-table-symbol'
    emojiEl.title = emoji.title
    emojiEl.textContent = emoji.emoji
    emojiCellEl.appendChild(emojiEl)
    emojiCellEl.className = 'emoji-table-cell'
    rowEl.appendChild(emojiCellEl)

    const descriptionCellEl = document.createElement('td')
    descriptionCellEl.textContent = emoji.text
    descriptionCellEl.className = 'emoji-table-cell emoji-table-description'
    rowEl.appendChild(descriptionCellEl)

    tbodyEl.appendChild(rowEl)
  })

  return el
}
