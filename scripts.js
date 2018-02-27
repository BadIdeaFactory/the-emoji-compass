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
    onDragStart: function (e) {
      flavorTextEl.classList.remove('hidden')
      instructionTextEl.classList.add('hidden')
    },
    onDrag: function (e) {
      onDialPositionUpdate(e, this.rotation)
    },
    onDragEnd: function (e) {
      // Select the emoji it's pointing at.
      const emoji = onDialPositionUpdate(e, this.rotation)
      selectedEmojis.push(emoji)

      // Disable this when it's done dragging.
      dial.disable()

      // Emit an event to let other listeners know about this.
      window.dispatchEvent(new window.CustomEvent(`dial-${id}:dragend`))
    },
    onThrowUpdate: function (e) {
      onDialPositionUpdate(e, this.rotation)
    }
  })

  const dial = {
    el,
    draggable: draggable[0],
    // Wrap original `enable()` to make element take z-index priority
    enable: function () {
      el.classList.add('active')
      draggable[0].enable()
      el.style.zIndex = 1000
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

function onDialPositionUpdate (event, rotation) {
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
  console.log(selectedEmojis)

  // Have a 4th dial automatically and randomly select 3 more emojis
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
