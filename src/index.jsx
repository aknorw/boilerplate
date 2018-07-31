import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// We use BrowserRouter assuming we will have a server that handle dynamic requests
// In case we won't, we should use HashRouter
import { BrowserRouter as Router } from 'react-router-dom'

import Root from 'containers/Root'
import configureStore from 'configureStore'

// Import global styles (ie. written in `injectGlobal`)
import 'styles'

const initialState = {}
const store = configureStore(initialState)

const MOUNT_NODE = document.getElementById('root')

// Prefer to wrap the app to use hydrate for SSR
const wrapApp = (Component, reduxStore) => (
  <Provider store={reduxStore}>
    <Router>
      <Component />
    </Router>
  </Provider>
)

render(wrapApp(Root, store), MOUNT_NODE)
