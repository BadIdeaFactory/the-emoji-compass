import React from 'react'
import PropTypes from 'prop-types'

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
  splitTextIntoSeparateLines(props.text).map((x) => <div key={x}>{x}</div>)
)

FlavorText.propTypes = {
  text: PropTypes.string.isRequired
}

export default FlavorText

