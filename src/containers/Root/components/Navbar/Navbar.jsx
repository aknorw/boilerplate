import React from 'react'
import PropTypes from 'prop-types'

import NavbarWrapper from './NavbarWrapper'
import NavbarBrand from './NavbarBrand'
import NavbarSection from './NavbarSection'
import NavLink from './NavLink'

const Navbar = ({ title }) => (
  <NavbarWrapper>
    <NavbarBrand to="/">
      {title}
    </NavbarBrand>
    <NavbarSection>
      <NavLink to="/settings">
        Settings
      </NavLink>
    </NavbarSection>
  </NavbarWrapper>
)

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Navbar
