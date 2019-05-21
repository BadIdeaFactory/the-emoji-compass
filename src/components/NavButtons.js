import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ROUTES } from '../constants'
import Button from './Button'
import InfoButton from './InfoButton'

import { resetAppState } from '../store/actions/app'

class NavButtons extends Component {
  static propTypes = {
    route: PropTypes.oneOf(Object.values(ROUTES)),
    showInfoOverlay: PropTypes.func.isRequired,
    resetAppState: PropTypes.func.isRequired
  }

  handleShare = (event) => {
    // TODO
  }
  
  render () {
    const { route, showInfoOverlay, resetAppState } = this.props

    return (
      <div className="final-buttons">
        {route === ROUTES.ANSWER && <Button type="share-android" title="Share this" onClick={this.handleShare} />}
        <InfoButton handler={showInfoOverlay} />
        {route === ROUTES.ANSWER && <Button type="close" title="Ask again" onClick={resetAppState} />}
      </div>
    )
  
  }
}

function mapStateToProps (state) {
  return {
    route: state.app.route,
    responseEmojis: state.app.responseEmojis
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetAppState: () => { dispatch(resetAppState()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButtons)
