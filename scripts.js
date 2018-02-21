const array = ['🐘', 'αΩ', '😇', '🐜', '🍏', '👶', '🐝', '🐦', '🍞', '🐮', '🐫', '🕯️', '🍲', '🦎', '💠', '🎉', '🐊', '🐬', '⚓', '🌐', '🦅', '⛑️', '🐎', '⏳', '🎸', '🤱', '🎎', '🌕','🦉', '🐍', '☀️', '⚔️', '⚡', '🌳', '🌹', '👹']
const flavor = [
  'hihihi'
]
const flavorPlaceholder = 'this is placeholder text'
const ringEl = document.getElementById('ring')
const dialsEl = document.getElementById('dials')
const flavorTextEl = document.getElementById('flavor-text-output')

// Create all the emoji items around the compass
array.forEach((i) => {
  const li = document.createElement('li')
  li.innerText = i
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

  Draggable.create(el, {
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
    onDrag: function (e) {
      onDialPositionUpdate(e, this.rotation)
    },
    onThrowUpdate: function (e) {
      onDialPositionUpdate(e, this.rotation)
    }
  })

  return el
}

function onDialPositionUpdate (event, rotation) {
  const position = getEmojiPosition(rotation, array)
  emojiOutputEl.textContent = array[position]
  flavorTextEl.textContent = flavor[position] || flavorPlaceholder
  // console.log(ringEl.querySelectorAll('li'))
  const allEmojis = ringEl.querySelectorAll('li')
  allEmojis.forEach((i) => {
    i.classList.remove('selected')
  })
  allEmojis[position].classList.add('selected')
}

const dial1 = makeDial('1')
const dial2 = makeDial('2')

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
