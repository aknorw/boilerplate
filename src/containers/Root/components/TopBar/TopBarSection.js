import styled from 'styled-components'

import variables from 'styles/variables'

export default styled.div`
  display: inline-flex;
  align-items: baseline;
  font-size: ${variables.font.defaultFontSize}em;
  > *:not(:last-child) {
    margin-right: ${variables.spacer / 2}rem;
  }
`
