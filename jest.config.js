const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, './src'),
  setupTestFrameworkScriptFile: '<rootDir>/../jest.setup.js',
  testEnvironment: 'node', // Have to use this, otherwise: 'SecurityError: localStorage is not available for opaque origins'
  roots: [
    '<rootDir>',
  ],
  globals: {
    APP_NAME: 'JEST',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!date-fns)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!index.jsx', // https://stackoverflow.com/questions/40523144/is-it-possible-to-test-your-react-app-entry-point-with-jest#comment69294003_40523144
    '!**/index.{js,jsx}', // As index files as rollup files, do not cover them
    '!**/*.stories.{js,jsx}', // Do not cover stories
  ],
  coverageDirectory: path.resolve(__dirname, './coverage'),
}
