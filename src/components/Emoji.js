/**
 * For rendering emoji as images
 */
import React from 'react'
import PropTypes from 'prop-types'

import alphaomega from '../img/alphaomega.svg'

export default function Emoji (props) {
  // Special case αΩ
  if (props.symbol.emoji === 'αΩ') {
    return (
      <span>
        <img src={alphaomega} alt="αΩ" />
      </span>
    )
  }

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

