import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import RootWrapper from '../RootWrapper'

describe('<RootWrapper />', () => {
  it('should be defined', () => {
    expect(RootWrapper).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <RootWrapper />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <RootWrapper />,
    )
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
    expect(tree).toHaveStyleRule('min-height', '100vh')
    expect(tree).toHaveStyleRule('overflow-x', 'hidden')
  })
})
