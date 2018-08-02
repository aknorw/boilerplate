import { all, fork } from 'redux-saga/effects'

import { fetchWeatherWatcher } from './weather/saga'

export default function* rootSaga() {
  yield all([
    fork(fetchWeatherWatcher),
  ])
}
