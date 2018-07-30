import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyle = styled.button.attrs({
  type: 'button',
})`
  padding: .5rem;
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
