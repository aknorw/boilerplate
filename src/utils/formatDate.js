import { format } from 'date-fns/esm'

import { dateLocales } from 'i18n'

export default (date, formatStr, locale = 'en') => format(date, formatStr, {
  locale: dateLocales[locale],
})
