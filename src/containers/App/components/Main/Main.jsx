import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'

const Main = ({ currentValue, handleButtonClick }) => (
  <div>
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
  </div>
)

Main.propTypes = {
  currentValue: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}

export default Main
