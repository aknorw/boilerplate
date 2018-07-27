const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, './src'),
  setupTestFrameworkScriptFile: '<rootDir>/../jest.setup.js',
  testEnvironment: 'node', // Have to use this, otherwise: 'SecurityError: localStorage is not available for opaque origins'
  roots: [
    '<rootDir>',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!index.jsx', // https://stackoverflow.com/questions/40523144/is-it-possible-to-test-your-react-app-entry-point-with-jest#comment69294003_40523144
    '!**/*.stories.{js,jsx}', // Do not cover stories
  ],
  coverageDirectory: path.resolve(__dirname, './coverage'),
}
