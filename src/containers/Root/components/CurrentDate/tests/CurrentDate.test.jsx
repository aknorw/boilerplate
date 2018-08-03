import React from 'react'
import { shallow } from 'enzyme'

import CurrentDate from '../CurrentDate'

console.error = jest.fn()

describe('<CurrentDate />', () => {
  it('should be defined', () => {
    expect(CurrentDate).toBeDefined()
  })
  it('should log 1 error when no props are passed', () => {
    shallow(<CurrentDate />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(
      <CurrentDate currentLocale="en" />,
    )
    expect(tree).toMatchSnapshot()
  })
})
