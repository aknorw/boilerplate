/* eslint-disable no-console */

import React from 'react'
import { shallow } from 'enzyme'

import TopBar from '../TopBar'

console.error = jest.fn()

describe('<TopBar />', () => {
  it('should be defined', () => {
    expect(TopBar).toBeDefined()
  })
  it('should log 2 errors when no props are passed', () => {
    shallow(<TopBar />)
    expect(console.error).toHaveBeenCalledTimes(2)
  })
  it('should render correctly', () => {
    const tree = shallow(<TopBar title="Test" />)
    expect(tree).toMatchSnapshot()
  })
})
