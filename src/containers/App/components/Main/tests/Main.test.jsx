import React from 'react'
import { shallow } from 'enzyme'

import Main from '../Main'

const mockFn = jest.fn()
console.error = jest.fn()

describe('<Main />', () => {
  it('should be defined', () => {
    expect(Main).toBeDefined()
  })
  it('should log 2 errors when no props are passed', () => {
    shallow(<Main />)
    expect(console.error).toHaveBeenCalledTimes(2)
  })
  it('should render correctly', () => {
    const currentValue = 'current'
    const tree = shallow(
      <Main
        currentValue={currentValue}
        handleButtonClick={mockFn}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should call mock function when button is clicked', () => {
    const currentValue = 'current'
    const tree = shallow(
      <Main
        currentValue={currentValue}
        handleButtonClick={mockFn}
      />,
    )
    tree.find('Button').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})
