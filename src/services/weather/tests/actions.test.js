import * as actions from '../actions'
import * as types from '../types'

describe('Services - Weather - Actions', () => {
  it('fetchWeather() should create the appropriate action', () => {
    const expectedAction = {
      type: types.WEATHER_FETCH,
    }
    expect(actions.fetchWeather()).toEqual(expectedAction)
  })
  it('fetchWeatherSuccess(list) should create the appropriate action', () => {
    const list = [{
      city: 'Paris',
      country: 'FR',
    }]
    const expectedAction = {
      type: types.SUCCESS_WEATHER_FETCH,
      weatherList: list,
    }
    expect(actions.fetchWeatherSuccess(list)).toEqual(expectedAction)
  })
  it('fetchWeatherFailure(error) should create the appropriate action', () => {
    const error = {
      code: 404,
      text: 'Oops',
    }
    const expectedAction = {
      type: types.FAILURE_WEATHER_FETCH,
      error,
    }
    expect(actions.fetchWeatherFailure(error)).toEqual(expectedAction)
  })
})
