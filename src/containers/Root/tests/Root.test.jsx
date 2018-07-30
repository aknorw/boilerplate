import React from 'react'
import { shallow } from 'enzyme'

import { Root } from '../Root'

console.error = jest.fn()

describe('<Root />', () => {
  it('should be defined', () => {
    expect(Root).toBeDefined()
  })
  it('should log 2 errors when no props are passed', () => { // 1 for Root, 1 for Navbar
    shallow(<Root />)
    expect(console.error).toHaveBeenCalledTimes(2)
  })
  it('should render correctly', () => {
    const foo = 'bar'
    const tree = shallow(
      <Root
        foo={foo}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
