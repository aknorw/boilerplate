import {
  combineReducers,
  applyMiddleware,
  compose,
  createStore,
} from 'redux'

import reducers from 'services/reducers'

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers(reducers)
  const middlewares = []
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
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  )
  return store
}
