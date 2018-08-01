/* eslint-disable react/prefer-stateless-function */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import { selectCurrentLocale } from 'services/language/selectors'

export class LanguageProvider extends PureComponent {
  render() {
    const { locale, messages, children } = this.props
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
      >
        {children}
      </IntlProvider>
    )
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

LanguageProvider.defaultProps = {
  locale: null,
  messages: {},
}

const mapStateToProps = createStructuredSelector({
  locale: selectCurrentLocale(),
})

export default connect(mapStateToProps)(LanguageProvider)
