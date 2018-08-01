import reducer, { initialState } from '../reducer'
import * as types from '../types'

describe('Services - Language - Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle LOCALE_CHANGE', () => {
    const locale = 'ru'
    expect(reducer(undefined, {
      type: types.LOCALE_CHANGE,
      locale,
    })).toEqual({
      ...initialState,
      current: locale,
    })
  })
})
