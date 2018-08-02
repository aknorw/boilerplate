import React from 'react'
import PropTypes from 'prop-types'

import LanguageButton from './LanguageButton'

// @TODO: Change this as the action is called even if the locale is already selected

const LanguageSwitcher = ({ currentLocale, availableLocales = [], onSwitch }) => availableLocales.map(locale => (
  <LanguageButton
    key={locale}
    isActive={locale === currentLocale}
    onClick={() => onSwitch(locale)}
  >
    {locale}
  </LanguageButton>
))

LanguageSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  onSwitch: PropTypes.func.isRequired,
}

export default LanguageSwitcher
