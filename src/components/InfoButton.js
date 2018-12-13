import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import './InfoButton.css'

const InfoButton = (props) => (
  <Button type="info" title="Info" className="info-button" onClick={props.handler} />
)

InfoButton.prototype.propTypes = {
  handler: PropTypes.func.isRequired,
}

export default InfoButton
