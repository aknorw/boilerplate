import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch } from 'react-router-dom'

const SwitchStyle = styled.main.attrs({
  role: 'main',
})`
  flex: 1;
`

const SwitchWrapper = ({ children }) => (
  <SwitchStyle>
    <Switch>
      {children}
    </Switch>
  </SwitchStyle>
)

SwitchWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

SwitchWrapper.defaultProps = {
  children: null,
}

export default SwitchWrapper
