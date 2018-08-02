import React from 'react'
import { shallow } from 'enzyme'
import { darken } from 'polished'
import 'jest-styled-components'

import variables from 'styles/variables'

import DateSpan from '../DateSpan'

describe('<DateSpan />', () => {
  it('should be defined', () => {
    expect(DateSpan).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <DateSpan />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <DateSpan secondary />,
    )
    expect(tree).toHaveStyleRule('text-transform', 'capitalize')
    expect(tree).toHaveStyleRule('color', darken(0.2, variables.colors.grayLightest))
  })
})
