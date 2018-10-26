import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { unregister } from './registerServiceWorker'

import './styles/typography.css'
import './styles/styles.css'

// Redux
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))

// registerServiceWorker()
unregister()
