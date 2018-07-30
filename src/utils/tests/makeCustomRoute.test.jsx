import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import makeCustomRoute from '../makeCustomRoute'

describe('Utils - makeCustomRoute', () => {
  it('should be defined', () => {
    expect(makeCustomRoute).toBeDefined()
  })
  it('should render correctly flat route', () => {
    const tree = shallow(
      <MemoryRouter>
        {makeCustomRoute({})}
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should render correctly nested route', () => {
    const route = {
      path: '/',
      routes: [{
        path: 'test/',
      }],
    }
    const tree = shallow(
      <MemoryRouter>
        {makeCustomRoute(route)}
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })
})
