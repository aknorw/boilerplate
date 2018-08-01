import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import variables from 'styles/variables'

import LanguageButton from '../LanguageButton'

describe('<LanguageButton />', () => {
  it('should be defined', () => {
    expect(LanguageButton).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <LanguageButton>
        TEST
      </LanguageButton>,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <LanguageButton />,
    )
    expect(tree).toHaveStyleRule('color', variables.colors.grayLight)
    expect(tree).toHaveStyleRule('cursor', 'pointer')
    expect(tree).toHaveStyleRule('text-transform', 'capitalize')
  })
  it('should have style rules when active', () => {
    const tree = shallow(
      <LanguageButton isActive />,
    )
    expect(tree).toHaveStyleRule('color', variables.colors.grayLightest)
    expect(tree).toHaveStyleRule('text-transform', 'capitalize')
  })
})
