import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
// We use createBrowserHistory assuming we will have a server that handle dynamic requests
// In case we won't, we should use createHashHistory
import createHistory from 'history/createBrowserHistory'
import { PersistGate } from 'redux-persist/integration/react'

import Root from 'containers/Root'
import configureStore from 'configureStore'

// Import global styles (ie. written in `injectGlobal`)
import 'styles'

// i18n related stuff
import LanguageProvider from 'containers/LanguageProvider'
import { translationMessages } from 'i18n'

const initialState = {}
const history = createHistory()
const { store, persistor } = configureStore(initialState, history)

const MOUNT_NODE = document.getElementById('root')

// Prefer to wrap the app to use hydrate for SSR
const wrapApp = (Component, reduxStore, messages) => (
  <Provider store={reduxStore}>
    <LanguageProvider messages={messages}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <Component />
        </PersistGate>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
)

// @TODO: Intl polyfill

render(wrapApp(Root, store, translationMessages), MOUNT_NODE)
