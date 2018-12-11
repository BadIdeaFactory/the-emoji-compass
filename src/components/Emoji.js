/**
 * For rendering emoji as images
 */
import React from 'react'
import PropTypes from 'prop-types'

import alphaomega from '../img/alphaomega.svg'

import Unicode_1f418 from '../../node_modules/emojione-assets/png/128/1f418.png'
import Unicode_1f607 from '../../node_modules/emojione-assets/png/128/1f607.png'
import Unicode_1f41c from '../../node_modules/emojione-assets/png/128/1f41c.png'
import Unicode_1f34f from '../../node_modules/emojione-assets/png/128/1f34f.png'
import Unicode_1f476 from '../../node_modules/emojione-assets/png/128/1f476.png'
import Unicode_1f41d from '../../node_modules/emojione-assets/png/128/1f41d.png'
import Unicode_1f426 from '../../node_modules/emojione-assets/png/128/1f426.png'
import Unicode_1f35e from '../../node_modules/emojione-assets/png/128/1f35e.png'
import Unicode_1f42e from '../../node_modules/emojione-assets/png/128/1f42e.png'
import Unicode_1f42b from '../../node_modules/emojione-assets/png/128/1f42b.png'
import Unicode_1f56f from '../../node_modules/emojione-assets/png/128/1f56f.png'
import Unicode_1f372 from '../../node_modules/emojione-assets/png/128/1f372.png'
import Unicode_1f98e from '../../node_modules/emojione-assets/png/128/1f98e.png'
import Unicode_1f4a0 from '../../node_modules/emojione-assets/png/128/1f4a0.png'
import Unicode_1f389 from '../../node_modules/emojione-assets/png/128/1f389.png'
import Unicode_1f40a from '../../node_modules/emojione-assets/png/128/1f40a.png'
import Unicode_1f42c from '../../node_modules/emojione-assets/png/128/1f42c.png'
import Unicode_2693 from '../../node_modules/emojione-assets/png/128/2693.png'
import Unicode_1f310 from '../../node_modules/emojione-assets/png/128/1f310.png'
import Unicode_1f985 from '../../node_modules/emojione-assets/png/128/1f985.png'
import Unicode_26d1 from '../../node_modules/emojione-assets/png/128/26d1.png'
import Unicode_1f40e from '../../node_modules/emojione-assets/png/128/1f40e.png'
import Unicode_23f3 from '../../node_modules/emojione-assets/png/128/23f3.png'
import Unicode_1f3b8 from '../../node_modules/emojione-assets/png/128/1f3b8.png'
import Unicode_1f931 from '../../node_modules/emojione-assets/png/128/1f931.png'
import Unicode_1f38e from '../../node_modules/emojione-assets/png/128/1f38e.png'
import Unicode_1f315 from '../../node_modules/emojione-assets/png/128/1f315.png'
import Unicode_1f989 from '../../node_modules/emojione-assets/png/128/1f989.png'
import Unicode_1f40d from '../../node_modules/emojione-assets/png/128/1f40d.png'
import Unicode_2600 from '../../node_modules/emojione-assets/png/128/2600.png'
import Unicode_2694 from '../../node_modules/emojione-assets/png/128/2694.png'
import Unicode_26a1 from '../../node_modules/emojione-assets/png/128/26a1.png'
import Unicode_1f333 from '../../node_modules/emojione-assets/png/128/1f333.png'
import Unicode_1f5bc from '../../node_modules/emojione-assets/png/128/1f5bc.png'
import Unicode_1f479 from '../../node_modules/emojione-assets/png/128/1f479.png'

import './Emoji.css'

const images = {}
images['1f418'] = Unicode_1f418
images['1f607'] = Unicode_1f607
images['1f41c'] = Unicode_1f41c
images['1f34f'] = Unicode_1f34f
images['1f476'] = Unicode_1f476
images['1f41d'] = Unicode_1f41d
images['1f426'] = Unicode_1f426
images['1f35e'] = Unicode_1f35e
images['1f42e'] = Unicode_1f42e
images['1f42b'] = Unicode_1f42b
images['1f56f'] = Unicode_1f56f
images['1f372'] = Unicode_1f372
images['1f98e'] = Unicode_1f98e
images['1f4a0'] = Unicode_1f4a0
images['1f389'] = Unicode_1f389
images['1f40a'] = Unicode_1f40a
images['1f42c'] = Unicode_1f42c
images['2693'] = Unicode_2693
images['1f310'] = Unicode_1f310
images['1f985'] = Unicode_1f985
images['26d1'] = Unicode_26d1
images['1f40e'] = Unicode_1f40e
images['23f3'] = Unicode_23f3
images['1f3b8'] = Unicode_1f3b8
images['1f931'] = Unicode_1f931
images['1f38e'] = Unicode_1f38e
images['1f315'] = Unicode_1f315
images['1f989'] = Unicode_1f989
images['1f40d'] = Unicode_1f40d
images['2600'] = Unicode_2600
images['2694'] = Unicode_2694
images['26a1'] = Unicode_26a1
images['1f333'] = Unicode_1f333
images['1f5bc'] = Unicode_1f5bc
images['1f479'] = Unicode_1f479

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
    code: PropTypes.string,
    emoji: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
  })
}
