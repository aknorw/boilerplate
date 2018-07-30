import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { setFoo } from 'services/basic/actions'

// This container does not follow the rule about DOM markup
// This is intentional as this is only temporary

import Button from 'components/Button'

export const Homepage = ({ handleButtonClick }) => (
  <div>
    <Helmet title="Homepage" />
    <h1>
      Homepage
    </h1>
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
