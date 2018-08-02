import { addLocaleData } from 'react-intl'

import enLocaleData from 'react-intl/locale-data/en'
import frLocaleData from 'react-intl/locale-data/fr'

import frDateLocale from 'date-fns/locale/fr'

import getBrowserLanguage from 'utils/getBrowserLanguage'

import enMessages from './translations/en.json'
import frMessages from './translations/fr.json'

addLocaleData([
  ...enLocaleData,
  ...frLocaleData,
])

export const appLocales = [
  'en',
  'fr',
]

// For date locales, en is not needing as it's the default in date-fns
export const dateLocales = {
  fr: frDateLocale,
}

const browserLanguage = getBrowserLanguage()

export const DEFAULT_LOCALE = (browserLanguage && appLocales.find(locale => browserLanguage.includes(locale))) || 'en'

export const translationMessages = {
  en: enMessages,
  fr: frMessages,
}
