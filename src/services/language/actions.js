import * as types from './types'

export const changeLocale = locale => ({
  type: types.LOCALE_CHANGE,
  locale,
})
