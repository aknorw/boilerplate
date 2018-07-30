import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import NavLink from '../NavLink'

console.error = jest.fn()

describe('<NavLink />', () => {
  it('should be defined', () => {
    expect(NavLink).toBeDefined()
  })
  it('should log 1 error when `to` is missing', () => {
    shallow(<NavLink />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(<NavLink to="/test" />)
    expect(tree).toMatchSnapshot()
  })
})
