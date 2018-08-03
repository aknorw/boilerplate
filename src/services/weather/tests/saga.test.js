/* eslint-disable redux-saga/no-unhandled-errors */

import { call, put } from 'redux-saga/effects'

import { fetchWeatherWorker, callOWMAPI } from '../saga'
import * as types from '../types'

describe('Services - Weather - Saga', () => {
  const gen = fetchWeatherWorker()
  it('should call the OpenWeatherMap API', () => {
    expect(gen.next().value).toEqual(call(callOWMAPI, 'Paris, France'))
  })
  it('should dispatch a fetchWeatherSuccess action if successful', () => {
    const list = [{
      city: 'Paris',
      country: 'FR',
      temp: 42,
    }, {
      city: 'Bruxelles',
      country: 'BE',
      temp: 10,
    }]
    expect(gen.next(list).value).toEqual(put({
      type: types.SUCCESS_WEATHER_FETCH,
      weatherList: list,
    }))
  })
  it('should dispatch a fetchWeatherFailure if unsuccessful', () => {
    const error = {
      text: 'Something went wrong!',
    }
    expect(gen.throw(error).value).toEqual(put({
      type: types.FAILURE_WEATHER_FETCH,
      error,
    }))
  })
  it('should be done', () => {
    expect(gen.next().done).toEqual(true)
  })
})
