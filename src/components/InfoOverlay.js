import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import './InfoOverlay.css'
import MINI_COMPASS_IMAGE from '../img/mini_compass.svg'
import THINKING_FACE_EMOJI from '../../node_modules/emojione-assets/png/128/1f914.png'

// TODO: Use thinking face emoji with <Emoji /> component
export default class InfoOverlay extends Component {
  static propTypes = {
    handler: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.contentEl = React.createRef()
    this.scrollerEl = React.createRef()
  }

  componentDidMount () {
    this.checkScrollPosition(this.contentEl.current)
  }

  checkScrollPosition = (el) => {
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const boundingHeight = el.getBoundingClientRect().height
    const scrollEl = this.scrollerEl.current

    if (scrollTop === 0) {
      scrollEl.classList.remove('info-overlay-scroller-top')
    } else {
      scrollEl.classList.add('info-overlay-scroller-top')
    }

    if (scrollTop + boundingHeight < scrollHeight) {
      this.scrollerEl.current.classList.add('info-overlay-scroller-bottom')
    } else {
      this.scrollerEl.current.classList.remove('info-overlay-scroller-bottom')
    }
  }

  handleCloseOverlay = (event) => {
    this.props.handler()
  }

  handleScrollContent = (event) => {
    this.checkScrollPosition(event.target)
  }

  render () {
    return (
      <div className="info-overlay-container">
        <div className="info-overlay-background" onClick={this.handleCloseOverlay} />
        <div className="info-overlay">
          <div className="info-overlay-scroller info-overlay-scroller-bottom" ref={this.scrollerEl}>
            <div className="info-overlay-content" ref={this.contentEl} onScroll={this.handleScrollContent}>
              <img src={MINI_COMPASS_IMAGE} alt="The Emoji Compass" className="mini-compass" />

              <h2>How to use</h2>

              <p>
                The Emoji Compass will tell you the answer to any question you hold in your heart. You can ask it an unlimited number of questions by combining the three emoji symbols that best represent your query. After you choose, the fourth needle will spin and hover on three more symbols, each imbued with many layers of meaning. Only by skillfully divining these meanings within will you navigate to the answer you seek.
              </p>

              <h2>About the project</h2>

              <p>
                The Emoji Compass is a production of <a href="https://biffud.com" target="_blank" rel="noopener noreferrer">Bad Idea Factory</a>, a creative collective that builds technology to make people <img className="emoji" src={THINKING_FACE_EMOJI} alt="thinking face emoji" />. The app is inspired by, but has no official endorsement or connection to, His Dark Materials, the series by Philip Pullman. You can and should <a href="https://www.indiebound.org/book/9780440238133" target="_blank" rel="noopener noreferrer">purchase his works</a>.
              </p>

              <p>
                Uncompensated laborers on this project include Matt Stempeck, Lou Huang, Margo Dunlap, Dan Schultz, and their accomplice Chris Peterson.
              </p>

              <h2>Colophon</h2>

              <p>
                You'll find the code that powers The Emoji Compass on <a href="https://github.com/BadIdeaFactory/the-emoji-compass" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>

              <p>
                The Emoji Compass was built with several open source technologies that were generously made available by their creators, including:
              </p>

              <ul>
                <li><a href="https://greensock.com/tweenmax" target="_blank" rel="noopener noreferrer">TweenMax</a></li>
                <li><a href="https://shopify.github.io/draggable/" target="_blank" rel="noopener noreferrer">Draggable</a></li>
                <li><a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">Create React App</a></li>
                <li><a href="https://hugogiraudel.com/2013/04/02/items-on-circle/" target="_blank" rel="noopener noreferrer">Mixin to place items on a circle</a> by Hugo Giraudel & Ana Tudor </li>
                <li>The <a href="https://fonts.google.com/specimen/Gentium+Book+Basic" target="_blank" rel="noopener noreferrer">Gentium Book Basic</a> font, licensed under <a href="http://scripts.sil.org/OFL" target="_blank" rel="noopener noreferrer">SIL Open Font License</a></li>
              </ul>

              <h2>Privacy policy</h2>

              <p>
                By using the app you agree to the <a href="https://github.com/BadIdeaFactory/the-emoji-compass/blob/master/PRIVACY.md" target="_blank" rel="noopener noreferrer">privacy policy</a>.
              </p>
              <br /> 
              <br /> 
              <br /> 
              <br /> 
              <br /> 
            </div>
          </div>
          <footer>
            <Button type="close-light" title="Close" onClick={this.handleCloseOverlay} />
          </footer>
        </div>
      </div>
    )
  }
}
