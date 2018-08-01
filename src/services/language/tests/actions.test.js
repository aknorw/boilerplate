import * as actions from '../actions'
import * as types from '../types'

describe('Services - Language - Actions', () => {
  it('changeLocale(locale) should create the appropriate action', () => {
    const locale = 'ru'
    const expectedAction = {
      type: types.LOCALE_CHANGE,
      locale,
    }
    expect(actions.changeLocale(locale)).toEqual(expectedAction)
  })
})
