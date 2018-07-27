import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'

import Button from './Button'

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('with emoji', withNotes('Maybe we should change the emoji...')(() => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="shrug">
        🤷
      </span>
    </Button>
  )))
