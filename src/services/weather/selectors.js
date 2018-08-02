import { createSelector } from 'reselect'

export const selectWeatherState = ({ weather }) => weather

export const selectFirstInWeatherList = () => createSelector(selectWeatherState, ({ weatherList }) => {
  if (weatherList.length) {
    return weatherList[0]
  }
  return {
    city: null,
    temp: null,
  }
})
