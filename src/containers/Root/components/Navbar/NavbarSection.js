import styled from 'styled-components'

export default styled.div`
  display: inline-flex;
  align-items: baseline;
  font-size: 1em;
  > *:not(:last-child) {
    margin-right: .5rem;
  }
`
