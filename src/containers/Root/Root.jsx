import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { changeLocale } from 'services/language/actions'
import { selectCurrentLocale, selectAvailableLocales } from 'services/language/selectors'

import routes from 'pages'

import { RootWrapper, SwitchWrapper } from './components/Layout'
import TopBar from './components/TopBar'
import CurrentDate from './components/CurrentDate'
import LanguageSwitcher from './components/LanguageSwitcher'

export const Root = ({ currentLocale, availableLocales, handleLanguageSwitch }) => (
  <RootWrapper>
    <Helmet
      titleTemplate={`%s - ${APP_NAME}`}
      defaultTitle={APP_NAME}
    >
      <html lang={currentLocale} />
    </Helmet>
    <TopBar
      title={APP_NAME}
    >
      <CurrentDate currentLocale={currentLocale} />
      <LanguageSwitcher
        currentLocale={currentLocale}
        availableLocales={availableLocales}
        onSwitch={handleLanguageSwitch}
      />
    </TopBar>
    <SwitchWrapper>
      {routes}
    </SwitchWrapper>
  </RootWrapper>
)

Root.propTypes = {
  currentLocale: PropTypes.string,
  availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLanguageSwitch: PropTypes.func.isRequired,
}

Root.defaultProps = {
  currentLocale: null,
}

const mapStateToProps = createStructuredSelector({
  currentLocale: selectCurrentLocale(),
  availableLocales: selectAvailableLocales(),
})

const mapDispatchToProps = dispatch => ({
  handleLanguageSwitch: locale => dispatch(changeLocale(locale)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withRouter,
  withConnect,
)(Root)
