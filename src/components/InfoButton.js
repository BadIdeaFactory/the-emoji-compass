import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './InfoButton.css'

import ICON_IMAGE from '../img/info.svg'

export default class InfoButton extends Component {
  static propTypes = {
    handler: PropTypes.func.isRequired,
  }

  handleClick = (event) => {
    this.props.handler()
  }

  render () {
    return (
      <div className="info-button" onClick={this.handleClick}>
        <img src={ICON_IMAGE} alt="Info" />
      </div>
    )
  }
}
