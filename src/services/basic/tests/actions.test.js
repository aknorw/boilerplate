import * as actions from '../actions'
import * as types from '../types'

describe('Services - Basic - Actions', () => {
  it('setFoo() should create the appropriate action', () => {
    const expectedAction = {
      type: types.FOO_UPDATE,
    }
    expect(actions.setFoo()).toEqual(expectedAction)
  })
})
