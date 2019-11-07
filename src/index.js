import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'
import App from './App'

import './styles/typography.css'
import './styles/styles.css'

// Redux
import store from './store'

Sentry.init({dsn: "https://dc3d74cf37114918b386e2c1152ac3f6@sentry.io/1811760"})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
