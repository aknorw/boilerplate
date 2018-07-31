import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import variables from 'styles/variables'

import Button from '../Button'

const mockFn = jest.fn()

describe('<Button />', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined()
  })
  it('should render correctly', () => {
    const text = 'Text'
    const tree = shallow(
      <Button>
        {text}
      </Button>,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <Button />,
    )
    expect(tree).toHaveStyleRule('padding', `${variables.spacer / 2}rem`)
  })
  it('should call mock function when button is clicked', () => {
    const tree = shallow(
      <Button onClick={mockFn}>
        Click me
      </Button>,
    )
    tree.simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})
