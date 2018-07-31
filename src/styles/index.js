import { injectGlobal } from 'styled-components'
import reset from 'styled-reset' // css-reset rules

import Lato from 'assets/fonts/Lato-Regular.ttf'

/* eslint-disable-next-line no-unused-expressions */
injectGlobal`
  ${reset}
  @font-face {
    font-family: 'Lato';
    src: url(${Lato})
  }
  body {
    font-family: Lato;
  }
`
