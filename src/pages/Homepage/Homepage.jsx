import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchWeather } from 'services/weather/actions'
import { selectFirstInWeatherList } from 'services/weather/selectors'

// This container does not follow the rule about DOM markup
// This is intentional as this is only temporary

import Button from 'components/Button'

import messages from './messages'

export const Homepage = ({ weather, handleButtonClick }) => (
  <div>
    <Helmet title="Homepage" />
    <h1>
      <FormattedMessage {...messages.title} />
    </h1>
    <h2>
      <FormattedMessage {...messages.subtitle} />
    </h2>
    <Button onClick={handleButtonClick}>
      Fetch weather for Paris
    </Button>
    <dl>
      <dt>
        <FormattedMessage {...messages.city} />
      </dt>
      <dd>
        {weather.city}
      </dd>
      <dt>
        <FormattedMessage {...messages.temperature} />
      </dt>
      <dd>
        {weather.temp}
      </dd>
    </dl>
  </div>
)

Homepage.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    temp: PropTypes.number,
  }),
  handleButtonClick: PropTypes.func.isRequired,
}

Homepage.defaultProps = {
  weather: {
    city: null,
    temp: null,
  },
}

const mapStateToProps = createStructuredSelector({
  weather: selectFirstInWeatherList(),
})

const mapDispatchToProps = dispatch => ({
  handleButtonClick: () => dispatch(fetchWeather()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
