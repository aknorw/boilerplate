import * as types from './types'

export const initialState = {
  foo: 'bar',
}

const basicReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FOO_UPDATE:
      return {
        ...state,
        foo: 'baz',
      }
    default:
      return state
  }
}

export default basicReducer
