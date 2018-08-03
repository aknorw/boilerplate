import React from 'react'
import { shallow } from 'enzyme'

import { Homepage } from '../Homepage'

const mockFn = jest.fn()
console.error = jest.fn()

describe('<Homepage />', () => {
  it('should be defined', () => {
    expect(Homepage).toBeDefined()
  })
  it('should log 1 error when no props are passed', () => {
    shallow(<Homepage />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(<Homepage handleButtonClick={mockFn} />)
    expect(tree).toMatchSnapshot()
  })
})
