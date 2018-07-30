import React from 'react'
import { shallow } from 'enzyme'

import Navbar from '../Navbar'

console.error = jest.fn()

describe('<Navbar />', () => {
  it('should be defined', () => {
    expect(Navbar).toBeDefined()
  })
  it('should log 1 error when no props are passed', () => {
    shallow(<Navbar />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(<Navbar title="Test" />)
    expect(tree).toMatchSnapshot()
  })
})
