/**
 * For rendering emoji as images
 */
import React from 'react'
import PropTypes from 'prop-types'

import alphaomega from '../img/alphaomega.svg'
import './Emoji.css'

// Dynamically import all emojione assets
// See here: https://webpack.js.org/guides/dependency-management/#context-module-api
// and: https://stackoverflow.com/a/42118921
function importAll (r) {
  const images = {}
  r.keys().map((item) => { images[item.replace('./', '').replace('.png', '')] = r(item) })
  return images
}

const images = importAll(
  require.context(
    '../../node_modules/emojione-assets/png/128/',
    false,
    /\.(png)$/
  )
)

export default function Emoji (props) {
  // Special case αΩ
  if (props.symbol.emoji === 'αΩ') {
    return (
      <span>
        <img className="emoji" src={alphaomega} alt={props.symbol.emoji} />
      </span>
    )
  }

  // If emoji one code is present
  if (props.symbol.code) {
    return (
      <span>
        <img className="emoji" src={images[props.symbol.code]} alt={props.symbol.emoji} />
      </span>
    )
  }

  // Fallback
  return (
    <span>
      {props.symbol.emoji}
    </span>
  )
}

Emoji.prototype.propTypes = {
  symbol: PropTypes.shape({
    emoji: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
  })
}

