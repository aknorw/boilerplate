import React from 'react'
import PropTypes from 'prop-types'

import TopBarWrapper from './TopBarWrapper'
import TopBarBrand from './TopBarBrand'
import TopBarSection from './TopBarSection'

const TopBar = ({ title, date, children }) => (
  <TopBarWrapper>
    <TopBarBrand to="/">
      {title}
    </TopBarBrand>
    <TopBarSection>
      {date}
    </TopBarSection>
    <TopBarSection>
      {children}
    </TopBarSection>
  </TopBarWrapper>
)

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

TopBar.defaultProps = {
  children: null,
}

export default TopBar
