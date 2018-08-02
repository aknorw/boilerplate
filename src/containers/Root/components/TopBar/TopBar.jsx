import React, { Children } from 'react'
import PropTypes from 'prop-types'

import TopBarWrapper from './TopBarWrapper'
import TopBarBrand from './TopBarBrand'
import TopBarSection from './TopBarSection'

const TopBar = ({ title, children }) => (
  <TopBarWrapper>
    <TopBarBrand to="/">
      {title}
    </TopBarBrand>
    {children && Children.map(children, child => (
      <TopBarSection>
        {child}
      </TopBarSection>
    ))}
  </TopBarWrapper>
)

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

TopBar.defaultProps = {
  children: null,
}

export default TopBar
