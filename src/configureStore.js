import {
  combineReducers,
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import reducers from 'services/reducers'
import sagas from 'services/sagas'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'router', // router will not be persisted
    'weather',
  ],
}

export default function configureStore(initialState = {}, history) {
  const rootReducer = combineReducers(reducers)
  const composeReducer = compose(
    connectRouter(history),
  )
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ]
  const enhancers = [applyMiddleware(...middlewares)]
  // In development, use Redux Devtools if available
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (
    process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /* eslint-enable */
  const store = createStore(
    persistReducer(persistConfig, composeReducer(rootReducer)),
    initialState,
    composeEnhancers(...enhancers),
  )
  const persistor = persistStore(store)
  sagaMiddleware.run(sagas)
  return {
    store,
    persistor,
  }
}
