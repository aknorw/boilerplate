import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { darken } from 'polished'

import variables from 'styles/variables'

export default styled(Link)`
  color: ${variables.colors.grayLightest};
  text-decoration: none;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  font-size: ${1.25 * variables.font.defaultFontSize}em;
  font-weight: bold;
  letter-spacing: ${variables.spacer / 4}em;
  text-transform: uppercase;
  transition: color ${variables.transition.defaultDuration}s ${variables.transition.defaultFunction};
  &:hover {
    color: ${darken(0.1, variables.colors.grayLightest)}
  }
`
