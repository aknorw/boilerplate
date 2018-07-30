import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import NavbarSection from '../NavbarSection'

describe('<NavbarSection />', () => {
  it('should be defined', () => {
    expect(NavbarSection).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <NavbarSection />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <NavbarSection />,
    )
    expect(tree).toHaveStyleRule('display', 'inline-flex')
    expect(tree).toHaveStyleRule('align-items', 'baseline')
    expect(tree).toHaveStyleRule('font-size', '1em')
  })
})
