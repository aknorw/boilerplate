import { selectWeatherState, selectFirstInWeatherList } from '../selectors'

describe('Services - Weather - Selectors', () => {
  let mockState
  beforeAll(() => {
    mockState = {
      weather: {
        weatherList: [{
          city: 'Paris',
          country: 'FR',
          temp: 42,
        }, {
          city: 'Bruxelles',
          country: 'BE',
          temp: 10,
        }],
        isLoading: false,
        error: null,
      },
    }
  })
  it('selectWeatherState() should return weather state', () => {
    const weatherState = selectWeatherState(mockState)
    expect(weatherState).toEqual(mockState.weather)
  })
  it('selectFirstInWeatherList() should return first value of weatherList', () => {
    const selected = selectFirstInWeatherList().resultFunc(mockState.weather)
    expect(selected).toEqual({
      city: 'Paris',
      country: 'FR',
      temp: 42,
    })
  })
  it('selectFirstInWeatherList() should return something if weatherList is empty', () => {
    const selected = selectFirstInWeatherList().resultFunc({
      weatherList: [],
    })
    expect(selected).toEqual({
      city: null,
      temp: null,
    })
  })
})
