import { createSelector } from 'reselect'

export const selectLanguageState = ({ language }) => language

export const selectCurrentLocale = () => createSelector(selectLanguageState, languageState => languageState.current)

export const selectAvailableLocales = () => createSelector(selectLanguageState, languageState => languageState.locales)
