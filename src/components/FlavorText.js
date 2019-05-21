import React from 'react'
import PropTypes from 'prop-types'
import './FlavorText.css'

/**
 * Takes a long piece of text from the an emoji symbol and splits it
 * into an array where each entry is its own sentence.
 * 
 * @param {string} string
 * @return {Array} - of strings split into separate sentences.
 */
export function splitTextIntoSeparateLines (string) {
  if (!string) return []

  // Split original text on periods.
  return string.replace(/\. /g, '.[split]').split('[split]')
}

// Return each phrase in a separate "line".
const FlavorText = (props) => (
  <div className="flavor-text-container">
    {splitTextIntoSeparateLines(props.text).map((x) => (
      <React.Fragment key={x}>
        <p>{x}</p>
        <p className="flavor-text-divider">⁓</p>
      </React.Fragment>
    ))}
  </div>
)

FlavorText.propTypes = {
  text: PropTypes.string.isRequired
}

export default FlavorText

