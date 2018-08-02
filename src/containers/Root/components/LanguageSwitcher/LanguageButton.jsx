import styled from 'styled-components'
import { darken } from 'polished'

import variables from 'styles/variables'

export default styled.span`
  color: ${({ isActive }) => (isActive ? variables.colors.grayLightest : variables.colors.grayLight)};
  cursor: ${({ isActive }) => (isActive ? '' : 'pointer')};
  text-transform: capitalize;
  transition: color ${variables.transition.defaultDuration}s ${variables.transition.defaultFunction};
  &:hover {
    color: ${({ isActive }) => !isActive && darken(0.2, variables.colors.grayLightest)}
  }
`
