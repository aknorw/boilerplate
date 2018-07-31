// For now, just use some variables exposed in an object
// If we want to implement theming, we may use <ThemeProvider />

export default {
  font: {
    defaultFontSize: 1, // em
  },
  spacer: 1, // rem
  colors: { // @TODO: Change color palette (taken from Bootstrap 4)
    white: '#fff',
    black: '#000',
    red: '#d9534f',
    orange: '#f0ad4e',
    yellow: '#ffd500',
    green: '#5cb85c',
    blue: '#0275d8',
    teal: '#5bc0de',
    pink: '#ff5b77',
    purple: '#613d7c',
    grayDark: '#292b2c',
    gray: '#464a4c',
    grayLight: '#636c72',
    grayLighter: '#eceeef',
    grayLightest: '#f7f7f9',
  },
  transition: {
    defaultDuration: 0.2,
    defaultFunction: 'ease-in-out',
  },
}
