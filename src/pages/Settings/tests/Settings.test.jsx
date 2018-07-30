import React from 'react'
import { shallow } from 'enzyme'

import { Settings } from '../Settings'

const mockFn = jest.fn()
console.error = jest.fn()

describe('<Settings />', () => {
  it('should be defined', () => {
    expect(Settings).toBeDefined()
  })
  it('should log 1 error when no props are passed', () => {
    shallow(<Settings />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(<Settings handleButtonClick={mockFn} />)
    expect(tree).toMatchSnapshot()
  })
})
