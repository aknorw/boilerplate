import { selectBasicState, selectFoo } from '../selectors'

describe('Services - Basic - Selectors', () => {
  let mockState
  beforeAll(() => {
    mockState = {
      basic: {
        foo: 'bar',
      },
    }
  })
  it('selectBasicState() should return basic state', () => {
    const basicState = selectBasicState(mockState)
    expect(basicState).toEqual(mockState.basic)
  })
  it('selectFoo() should return foo value', () => {
    const selected = selectFoo().resultFunc(mockState.basic)
    expect(selected).toEqual('bar')
  })
})
