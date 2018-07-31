import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectFoo } from 'services/basic/selectors'

import routes from 'pages'

import { RootWrapper, SwitchWrapper } from './components/Layout'
import TopBar from './components/TopBar'

// This is temporary
const today = new Intl.DateTimeFormat().format(new Date())

export const Root = ({ foo }) => (
  <RootWrapper>
    <Helmet
      titleTemplate={`%s - ${APP_NAME}`}
      defaultTitle={APP_NAME}
    >
      {/* The following line will be used when implementing i18n */}
      <html lang="en" />
    </Helmet>
    <TopBar
      title={foo}
      date={today}
    >
      ...
    </TopBar>
    <SwitchWrapper>
      {routes}
    </SwitchWrapper>
  </RootWrapper>
)

Root.propTypes = {
  foo: PropTypes.string.isRequired,
}

const mapStateToProps = createStructuredSelector({
  foo: selectFoo(),
})

const withConnect = connect(mapStateToProps, null)

export default compose(
  withRouter,
  withConnect,
)(Root)
