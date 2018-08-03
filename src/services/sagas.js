import { all, fork } from 'redux-saga/effects'

import { fetchWeatherWatcher } from './weather/saga'

export default function* rootSaga() {
  try {
    yield all([
      fork(fetchWeatherWatcher),
    ])
  } catch (error) {
    // Do something
  }
}
