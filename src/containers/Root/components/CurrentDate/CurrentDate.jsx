import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { formatDate } from 'utils'

import DateSpan from './DateSpan'

import messages from './messages'

const today = new Date()

const CurrentDate = ({ currentLocale }) => [
  <DateSpan key="date">
    {formatDate(today, 'EEEE d MMMM YYYY', currentLocale)}
  </DateSpan>,
  <DateSpan secondary key="week">
    <FormattedMessage
      {...messages.week}
      values={{ weekNumber: formatDate(today, 'w', currentLocale) }}
    />
  </DateSpan>,
]

CurrentDate.propTypes = {
  currentLocale: PropTypes.string.isRequired,
}

export default CurrentDate
