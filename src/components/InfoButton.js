import React, { Component } from 'react'
import './InfoButton.css'

import ICON_IMAGE from '../img/info.svg'

export default class InfoButton extends Component {
  handleClick = (event) => {
    console.log('HI')
  }

  render () {
    return (
      <div className="info-button" onClick={this.handleClick}>
        <img src={ICON_IMAGE} alt="Info" />
      </div>
    )
  }
}
