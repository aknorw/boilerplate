import createAsyncComponent from '../createAsyncComponent'

// We do not test react-loadable as we assume the library is well tested
// All we have to test are custom components

describe('Utils - createAsyncComponent', () => {
  it('should be defined', () => {
    expect(createAsyncComponent).toBeDefined()
  })
})
