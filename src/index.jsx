import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from 'containers/App'
import configureStore from 'configureStore'

const initialState = {}
const store = configureStore(initialState)

const MOUNT_NODE = document.getElementById('root')

// Prefer to wrap the app to use hydrate for SSR
const wrapApp = (Component, reduxStore) => (
  <Provider store={reduxStore}>
    <Component />
  </Provider>
)

render(wrapApp(App, store), MOUNT_NODE)
