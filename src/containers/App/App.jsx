import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setFoo } from 'services/basic/actions'
import { selectFoo } from 'services/basic/selectors'

import Main from './components/Main'

export const App = ({ foo, handleButtonClick }) => (
  <Main
    currentValue={foo}
    handleButtonClick={handleButtonClick}
  />
)

App.propTypes = {
  foo: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  foo: selectFoo(),
})

const mapDispatchToProps = dispatch => ({
  handleButtonClick: () => dispatch(setFoo()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withConnect(App)
