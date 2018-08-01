import React from 'react'
import { shallow } from 'enzyme'

import { Root } from '../Root'

const testLocales = ['es', 'ru']

const mockFn = jest.fn()

describe('<Root />', () => {
  it('should be defined', () => {
    expect(Root).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <Root
        currentLocale={testLocales[0]}
        availableLocales={testLocales}
        handleLanguageSwitch={mockFn}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
