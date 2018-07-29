import React from 'react'
import { shallow } from 'enzyme'

import { App } from '../App'

const mockFn = jest.fn()
console.error = jest.fn()

describe('<App />', () => {
  it('should be defined', () => {
    expect(App).toBeDefined()
  })
  it('should log 4 errors when no props are passed', () => { // 2 for App, 2 for Main
    shallow(<App />)
    expect(console.error).toHaveBeenCalledTimes(4)
  })
  it('should render correctly', () => {
    const foo = 'bar'
    const tree = shallow(
      <App
        foo={foo}
        handleButtonClick={mockFn}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
