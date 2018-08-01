import { addLocaleData } from 'react-intl'

import enLocaleData from 'react-intl/locale-data/en'
import frLocaleData from 'react-intl/locale-data/fr'

import { getBrowserLanguage } from 'utils'

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

const browserLanguage = getBrowserLanguage()

export const DEFAULT_LOCALE = (browserLanguage && appLocales.find(locale => browserLanguage.includes(locale))) || 'en'

export const translationMessages = {
  en: enMessages,
  fr: frMessages,
}
