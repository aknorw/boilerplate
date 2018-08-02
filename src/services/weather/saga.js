import { call, put, takeEvery } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'

const OPEN_WEATHER_MAP_API_KEY = '1f9c55452ba0c85061b654113bfb6d01'

// This should be in a separate file
export const callOWMAPI = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`
  const response = await fetch(url)
  const json = await response.json()
  if (json.cod === 404) {
    return []
  }
  return json.list.map(item => ({
    id: item.id,
    city: item.name,
    country: item.sys.country,
    temp: item.main.temp,
    description: item.weather[0].main,
    icon: item.weather[0].icon,
  }))
}

export function* fetchWeatherWorker() {
  try {
    const response = yield call(callOWMAPI, 'Paris, France')
    yield put(actions.fetchWeatherSuccess(response))
  } catch (error) {
    yield put(actions.fetchWeatherFailure(error))
  }
}

export function* fetchWeatherWatcher() {
  yield takeEvery(types.WEATHER_FETCH, fetchWeatherWorker)
}
