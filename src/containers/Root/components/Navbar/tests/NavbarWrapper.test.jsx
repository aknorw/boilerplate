import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import NavbarWrapper from '../NavbarWrapper'

describe('<NavbarWrapper />', () => {
  it('should be defined', () => {
    expect(NavbarWrapper).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <NavbarWrapper />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <NavbarWrapper />,
    )
    expect(tree).toHaveStyleRule('flex-shrink', '0')
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('justify-content', 'space-between')
    expect(tree).toHaveStyleRule('align-items', 'center')
    expect(tree).toHaveStyleRule('padding', '1rem 2rem')
    expect(tree).toHaveStyleRule('background-color', 'black')
    expect(tree).toHaveStyleRule('color', 'white')
  })
})
