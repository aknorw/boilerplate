import { selectLanguageState, selectCurrentLocale, selectAvailableLocales } from '../selectors'

describe('Services - Language - Selectors', () => {
  let mockState
  beforeAll(() => {
    mockState = {
      language: {
        current: 'es',
        locales: ['pt', 'es'],
      },
    }
  })
  it('selectLanguageState() should return language state', () => {
    const languageState = selectLanguageState(mockState)
    expect(languageState).toEqual(mockState.language)
  })
  it('selectCurrentLocale() should return current value', () => {
    const selected = selectCurrentLocale().resultFunc(mockState.language)
    expect(selected).toEqual('es')
  })
  it('selectAvailableLocales() should return locales value', () => {
    const selected = selectAvailableLocales().resultFunc(mockState.language)
    expect(selected).toEqual(['pt', 'es'])
  })
})
