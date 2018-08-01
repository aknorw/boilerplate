import { DEFAULT_LOCALE, appLocales } from 'i18n'

import * as types from './types'

export const initialState = {
  current: DEFAULT_LOCALE,
  locales: appLocales,
}

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOCALE_CHANGE:
      return {
        ...state,
        current: action.locale,
      }
    default:
      return state
  }
}

export default languageReducer
