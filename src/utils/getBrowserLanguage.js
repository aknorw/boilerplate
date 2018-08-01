// @TODO: Test this function

export default () => {
  if (typeof window === 'object' && window.navigator) {
    return (
      (window.navigator.languages && window.navigator.languages[0]) // latest versions of Chrome and Firefox set this correctly
      || window.navigator.language // latest versions of Chrome, Firefox, and Safari set this correctly
      || window.navigator.userLanguage // IE only
    )
  }
  return undefined
}
