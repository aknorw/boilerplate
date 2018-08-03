import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import TopBarBrand from '../TopBarBrand'

console.error = jest.fn()

describe('<TopBarBrand />', () => {
  it('should be defined', () => {
    expect(TopBarBrand).toBeDefined()
  })
  it('should log 1 error when `to` is missing', () => {
    shallow(<TopBarBrand />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(
      <TopBarBrand to="/test" />,
    )
    expect(tree).toMatchSnapshot()
  })
})
