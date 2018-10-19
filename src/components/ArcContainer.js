import React from 'react'
import PropTypes from 'prop-types'
import Arc1 from './Arc1'
import Arc2 from './Arc2'

export default class ArcContainer extends React.Component {
  static propTypes = {
    type: PropTypes.number.isRequired,
    handleSelectEmoji: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      active: null
    }
  }

  handleSelect = (id) => {
    this.props.handleSelectEmoji(id)
    this.setState({
      active: id
    })
  }

  render () {
    if (this.props.type === 1) {
      return <Arc1 active={this.state.active} handleSelect={this.handleSelect} />
    }

    if (this.props.type === 2) {
      return <Arc2 active={this.state.active} handleSelect={this.handleSelect} />
    }

    return null
  }
}
