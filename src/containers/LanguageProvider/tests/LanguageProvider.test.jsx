import React from 'react'
import { shallow } from 'enzyme'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Provider } from 'react-redux'
import createHistory from 'history/createMemoryHistory'

import configureStore from 'configureStore'
import { translationMessages } from 'i18n'

import ConnectedLanguageProvider, { LanguageProvider } from '../LanguageProvider'

const history = createHistory()

const messages = defineMessages({
  someMessage: {
    id: 'test.id',
    defaultMessage: 'This is some default message',
    en: 'This is translated in english',
  },
})

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = (
      <h1>
        Test
      </h1>
    )
    const tree = shallow(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>,
    )
    expect(tree.contains(children)).toBe(true)
  })
})

describe('<ConnectedLanguageProvider />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, history)
  })
  it('should render the default language message', () => {
    const tree = shallow(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>,
    )
    expect(tree.contains(
      <FormattedMessage {...messages.someMessage} />,
    )).toBe(true)
  })
})
