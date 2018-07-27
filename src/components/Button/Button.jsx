import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
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
