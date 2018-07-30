import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import MainWrapper from '../MainWrapper'

describe('<MainWrapper />', () => {
  it('should be defined', () => {
    expect(MainWrapper).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <MainWrapper />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <MainWrapper />,
    )
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
    expect(tree).toHaveStyleRule('min-height', '100vh')
    expect(tree).toHaveStyleRule('overflow-x', 'hidden')
  })
})
