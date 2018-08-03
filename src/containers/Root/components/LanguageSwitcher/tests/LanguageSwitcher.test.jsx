import React from 'react'
import { shallow } from 'enzyme'

import LanguageSwitcher from '../LanguageSwitcher'

const testLocales = ['es', 'ru']

const mockFn = jest.fn()
console.error = jest.fn()

describe('<LanguageSwitcher />', () => {
  it('should be defined', () => {
    expect(LanguageSwitcher).toBeDefined()
  })
  it('should log 2 errors when no props are passed', () => {
    shallow(<LanguageSwitcher />)
    expect(console.error).toHaveBeenCalledTimes(2)
  })
  it('should render correctly', () => {
    const tree = shallow(
      <LanguageSwitcher
        currentLocale={testLocales[0]}
        availableLocales={testLocales}
        onSwitch={mockFn}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should call mock function when a button is clicked', () => {
    const tree = shallow(
      <LanguageSwitcher
        currentLocale={testLocales[0]}
        availableLocales={testLocales}
        onSwitch={mockFn}
      />,
    )
    tree.at(0).first().simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})
