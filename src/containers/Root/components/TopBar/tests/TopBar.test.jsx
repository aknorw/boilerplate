import React from 'react'
import { shallow } from 'enzyme'

import TopBar from '../TopBar'

console.error = jest.fn()

describe('<TopBar />', () => {
  it('should be defined', () => {
    expect(TopBar).toBeDefined()
  })
  it('should log 1 error when no props are passed', () => {
    shallow(<TopBar />)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  it('should render correctly', () => {
    const tree = shallow(
      <TopBar title="Test">
        <div>
          Some additional information here
        </div>
      </TopBar>,
    )
    expect(tree).toMatchSnapshot()
  })
})
