import * as types from './types'

export const initialState = {
  weatherList: [],
  isLoading: false,
  error: null,
}

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WEATHER_FETCH:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS_WEATHER_FETCH:
      return {
        ...state,
        weatherList: action.weatherList,
        isLoading: false,
        error: null,
      }
    case types.FAILURE_WEATHER_FETCH:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default weatherReducer
