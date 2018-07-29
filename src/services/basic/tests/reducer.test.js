import reducer, { initialState } from '../reducer'
import * as types from '../types'

describe('Services - Basic - Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle FOO_UPDATE', () => {
    expect(reducer(undefined, {
      type: types.FOO_UPDATE,
    })).toEqual({
      foo: 'baz',
    })
  })
})
