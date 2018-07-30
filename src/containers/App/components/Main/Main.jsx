import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'

import MainWrapper from './MainWrapper'

const Main = ({ currentValue, handleButtonClick }) => (
  <MainWrapper>
    <h1>
      Hello React
    </h1>
    <div>
      <span>
        {`Current value: ${currentValue}`}
      </span>
    </div>
    <Button onClick={handleButtonClick}>
      Change value
    </Button>
  </MainWrapper>
)

Main.propTypes = {
  currentValue: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}

export default Main
