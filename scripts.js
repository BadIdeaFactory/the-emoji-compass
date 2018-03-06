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

const ringEl = document.getElementById('ring')
const dialsEl = document.getElementById('dials')
const flavorTextOutputEl = document.getElementById('flavor-text-output')
const flavorTextEl = document.querySelector('.flavor-text')
const instructionTextEl = document.querySelector('.instruction-text')
const selectedEmojis = []

// Create all the emoji items around the compass
symbols.forEach((i) => {
  const li = document.createElement('li')
  li.innerText = i.emoji
  ringEl.appendChild(li)
})

// Create dials
function makeDial (id) {
  const el = document.createElement('div')
  el.classList.add('dial')
  el.classList.add(`dial-${id}`)
  dialsEl.appendChild(el)
  
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
      selectedEmojis.push(emoji)

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
      draggable[0].enable()
    },
    // Wrap original `disable()` to make element keep non-selectable style
    disable: function () {
      el.classList.remove('active')
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

const dial1 = makeDial('1')
const dial2 = makeDial('2')
const dial3 = makeDial('3')
const dial4 = makeDial('4')

// Start all dials at a random position
TweenLite.set(dial1.el, { rotation: Math.random() * 360 })
TweenLite.set(dial2.el, { rotation: Math.random() * 360 })
TweenLite.set(dial3.el, { rotation: Math.random() * 360 })
TweenLite.set(dial4.el, { rotation: Math.random() * 360 })

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

const emojiOutputEl = document.getElementById('emoji-output')

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

function getRandomRotation () {
  const randomEmoji = Math.round(Math.random() * symbols.length)
  const increment = 360 / symbols.length
  return randomEmoji * increment
}

function rotateDialStep (dial, rotateTo, rotateDirection, rotateQuantity, resolve) {
  // rotateDirection = 0 => clockwise
  // rotateDirection = 1 => counterclockwise
  let rotated = false
  const quantity = 360 * rotateQuantity

  if (rotateDirection === 0 && dial.draggable.rotation <= rotateTo + quantity) {
    TweenLite.set(dial.el, { rotation: dial.draggable.rotation + 1 })
    rotated = true
  } else if (rotateDirection === 1 && dial.draggable.rotation >= rotateTo - quantity) {
    TweenLite.set(dial.el, { rotation: dial.draggable.rotation - 1 })
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
    const emoji = onDialPositionUpdate(dial.draggable.rotation)
    resolve(emoji)
  }
}

function rotatePromise (dial, rotateTo) {
  const rotateDirection = Math.round(Math.random()) // 0 or 1.
  const rotateQuantity = Math.round(Math.random() * 3) + 1 // a number between 1 and 3 inclusive

  return new Promise(function (resolve) {
    window.requestAnimationFrame(function (timestamp) {
      rotateDialStep(dial, rotateTo, rotateDirection, rotateQuantity, resolve)
    })
  })
}

// Have a 4th dial automatically and randomly select 3 more emojis
function autoRotateDial (dial) {
  dial.el.classList.add('active')

  // Make sure the dial picks up its initial position by calling update()
  dial.draggable.update()

  const randomEmojis = []

  const rotateTo = getRandomRotation()
  rotatePromise(dial, rotateTo)
    .then(function (emoji) {
      console.log(emoji)
      randomEmojis.push(emoji)
      const rotateTo = getRandomRotation()
      return rotatePromise(dial, rotateTo)
    })
    .then(function (emoji) {
      console.log(emoji)
      randomEmojis.push(emoji)
      const rotateTo = getRandomRotation()
      return rotatePromise(dial, rotateTo)
    })
    .then(function (emoji) {
      console.log(emoji)
      randomEmojis.push(emoji)
      console.log(randomEmojis)
      flavorTextEl.classList.add('hidden')
      const emoji1 = selectedEmojis.map(function(i) { return i.emoji }).join(', ')
      const emoji2 = randomEmojis.map(function(i) { return i.emoji }).join(', ')
      instructionTextEl.textContent = `
        I asked the emoji alethiometer ${emoji1}, and it answered, ${emoji2}.
        `
      instructionTextEl.classList.remove('hidden')
      instructionTextEl.classList.add('final')
    })
  }
