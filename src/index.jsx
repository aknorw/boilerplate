import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'

import Root from 'containers/Root'
import configureStore from 'configureStore'

// Import global styles (ie. written in `injectGlobal`)
import 'styles'

const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)

const MOUNT_NODE = document.getElementById('root')

// Prefer to wrap the app to use hydrate for SSR
const wrapApp = (Component, reduxStore) => (
  <Provider store={reduxStore}>
    <ConnectedRouter history={history}>
      <Component />
    </ConnectedRouter>
  </Provider>
)

render(wrapApp(Root, store), MOUNT_NODE)
