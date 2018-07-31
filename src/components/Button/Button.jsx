import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import variables from 'styles/variables'

const ButtonStyle = styled.button.attrs({
  type: 'button',
})`
  padding: ${variables.spacer / 2}rem;
`

const Button = ({ children, ...rest }) => (
  <ButtonStyle {...rest}>
    {children}
  </ButtonStyle>
)

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Button.defaultProps = {
  children: null,
}

export default Button
