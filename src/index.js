import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './styles/typography.css'
import './styles/styles.css'
import './scripts'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
