import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import SwitchWrapper from '../SwitchWrapper'

describe('<SwitchWrapper />', () => {
  it('should be defined', () => {
    expect(SwitchWrapper).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <SwitchWrapper />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <SwitchWrapper />,
    )
    expect(tree).toHaveStyleRule('flex', '1')
  })
})
