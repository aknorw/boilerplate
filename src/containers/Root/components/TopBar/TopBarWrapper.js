import styled from 'styled-components'

import variables from 'styles/variables'

export default styled.nav`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${variables.spacer}rem ${2 * variables.spacer}rem;
  background-color: ${variables.colors.grayDark};
  color: ${variables.colors.grayLightest};
`
