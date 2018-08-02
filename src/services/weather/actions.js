import * as types from './types'

export const fetchWeather = () => ({
  type: types.WEATHER_FETCH,
})

export const fetchWeatherSuccess = weatherList => ({
  type: types.SUCCESS_WEATHER_FETCH,
  weatherList,
})

export const fetchWeatherFailure = error => ({
  type: types.FAILURE_WEATHER_FETCH,
  error,
})
