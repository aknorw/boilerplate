import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import variables from 'styles/variables'

import TopBarWrapper from '../TopBarWrapper'

describe('<TopBarWrapper />', () => {
  it('should be defined', () => {
    expect(TopBarWrapper).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <TopBarWrapper />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <TopBarWrapper />,
    )
    expect(tree).toHaveStyleRule('flex-shrink', '0')
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('justify-content', 'space-between')
    expect(tree).toHaveStyleRule('align-items', 'center')
    expect(tree).toHaveStyleRule('padding', `${variables.spacer}rem ${2 * variables.spacer}rem`)
    expect(tree).toHaveStyleRule('background-color', variables.colors.grayDark)
    expect(tree).toHaveStyleRule('color', variables.colors.grayLightest)
  })
})
