import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import NavbarBrand from '../NavbarBrand'

console.error = jest.fn()

describe('<NavbarBrand />', () => {
  it('should be defined', () => {
    expect(NavbarBrand).toBeDefined()
  })
  it('should log 1 error when `to` is missing', () => {
    shallow(<NavbarBrand />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(
      <NavbarBrand />,
    )
    expect(tree).toMatchSnapshot()
  })
})
