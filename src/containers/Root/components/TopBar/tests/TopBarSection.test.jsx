import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import variables from 'styles/variables'

import TopBarSection from '../TopBarSection'

describe('<TopBarSection />', () => {
  it('should be defined', () => {
    expect(TopBarSection).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <TopBarSection />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <TopBarSection />,
    )
    expect(tree).toHaveStyleRule('display', 'inline-flex')
    expect(tree).toHaveStyleRule('align-items', 'baseline')
    expect(tree).toHaveStyleRule('font-size', `${variables.font.defaultFontSize}em`)
  })
})
