import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { setFoo } from 'services/basic/actions'

// This container does not follow the rule about DOM markup
// This is intentional as this is only temporary

import Button from 'components/Button'

import messages from './messages'

export const Homepage = ({ handleButtonClick }) => (
  <div>
    <Helmet title="Homepage" />
    <h1>
      <FormattedMessage {...messages.title} />
    </h1>
    <h2>
      <FormattedMessage {...messages.subtitle} />
    </h2>
    <Button onClick={handleButtonClick}>
      Change foo from Homepage
    </Button>
  </div>
)

Homepage.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  handleButtonClick: () => dispatch(setFoo()),
})

export default connect(null, mapDispatchToProps)(Homepage)
