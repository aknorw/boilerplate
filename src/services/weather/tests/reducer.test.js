import reducer, { initialState } from '../reducer'
import * as types from '../types'

describe('Services - Weather - Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle WEATHER_FETCH', () => {
    expect(reducer(undefined, {
      type: types.WEATHER_FETCH,
    })).toEqual({
      ...initialState,
      isLoading: true,
    })
  })
  it('should handle SUCCESS_WEATHER_FETCH', () => {
    const list = [{
      city: 'Paris',
      country: 'FR',
    }]
    expect(reducer(undefined, {
      type: types.SUCCESS_WEATHER_FETCH,
      weatherList: list,
    })).toEqual({
      ...initialState,
      weatherList: list,
    })
  })
  it('should handle FAILURE_WEATHER_FETCH', () => {
    const error = {
      code: 404,
      text: 'Oops',
    }
    expect(reducer(undefined, {
      type: types.FAILURE_WEATHER_FETCH,
      error,
    })).toEqual({
      ...initialState,
      error,
    })
  })
})
