import styled from 'styled-components'
import { darken } from 'polished'

import variables from 'styles/variables'

export default styled.div`
  text-transform: capitalize;
  color: ${({ secondary }) => (secondary ? darken(0.2, variables.colors.grayLightest) : 'inherit')}
`
