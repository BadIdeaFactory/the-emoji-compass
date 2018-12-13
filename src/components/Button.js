import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

import INFO_ICON from '../img/info.svg'
import SHARE_ANDROID_ICON from '../img/share_android.svg'
import SHARE_IOS_ICON from '../img/share_ios.svg'
import CLOSE_ICON from '../img/close.svg'

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: ''
  }

  handleClick = (event) => {
    this.props.onClick()
  }

  getImage = (type) => {
    switch (type) {
      case 'close':
        return CLOSE_ICON
      case 'share-android':
        return SHARE_ANDROID_ICON
      case 'share-ios':
        return SHARE_IOS_ICON
      case 'info':
        return INFO_ICON
    }
  }

  render () {
    const { type, title, className } = this.props

    return (
      <button
        className={'button ' + className}
        title={title}
        onClick={this.handleClick}
      >
        <img src={this.getImage(type)} alt="" />
      </button>
    )
  }
}
