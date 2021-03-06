# Boilerplate

## Table of contents

* [Features](#features)
* [Scripts](#scripts)
* [Guidelines](#guidelines)
  * [Folders organization](#folders-organization)
  * [Components](#components)
    * [Container components](#container-components)
    * [Presentational components](#presentational-components)
  * [Redux](#redux)
    * [Reducers](#reducers)
    * [Action creators](#action-creators)
    * [Action types](#action-types)
    * [Sagas](#sagas)
    * [Selectors](#selectors)
  * [Routing](#routing)
    * [Routes configuration](#routes-configuration)
    * [Code splitting](#code-splitting)
  * [i18n](#i18n)
  * [Utilities](#utilities)
  * [Naming things](#naming-things)
    * [General](#general)
    * [Event and event handlers](#event-and-event-handlers)
* [Development](#development)
  * Logging :construction:
  * [Type checking](#type-checking)
  * [Linting](#linting)
  * [Testing](#testing)
    * [Unit Testing](#unit-testing)
    * [UI Testing](#ui-testing)
  * [Transpiling](#transpiling)
  * Building :construction:
  * Continuous Integration / Continuous Development :construction:
* [Version control](#version-control)
  * [Commit messages](#commit-messages)
  * [Versioning](#versioning)

## Features

* [`React`](https://github.com/facebook/react)
* [`Redux`](https://github.com/reduxjs/redux) and [`React-Redux`](https://github.com/reduxjs/react-redux) to manage the state
* [`Redux-Saga`](https://github.com/redux-saga/redux-saga) to handle all of the side effects logic in a central place
* [`Reselect`](https://github.com/reduxjs/reselect) to build memoized selectors
* [`Styled-Components`](https://github.com/styled-components/styled-components) to write CSS-in-JS
* [`React-Router`](https://github.com/ReactTraining/react-router) to manage routes and [`Connected-React-Router`](https://github.com/supasate/connected-react-router) to sync history with `redux`
* [`Redux-Persist`](https://github.com/rt2zz/redux-persist) to persist state to local storage
* [`React-Loadable`](https://github.com/jamiebuilds/react-loadable) to load components with dynamic imports (code-splitting made simple)
* [`React-Helmet`](https://github.com/nfl/react-helmet) to manage head tags easily
* [`React-Intl`](https://github.com/yahoo/react-intl) to translate the app
* [`date-fns`](https://github.com/date-fns/date-fns) to work with dates and times

## Scripts

> :warning: The package manager used with this boilerplate is [**Yarn**](https://yarnpkg.com)

Script | Explanation
--- | ---
`yarn clean` | Remove `dist` folder
`yarn lint` | Lint `src` folder
`yarn test` | Run tests
`yarn storybook` | Run the storybook on port 9001
`yarn dev` | Run application (HMR)
`yarn extract:msg` | Extract `react-intl` messages
`yarn build` | Build application

## Guidelines

Useful resources:
* [React/Redux Style Guide](https://gist.github.com/datchley/4e0d05c526d532d1b05bf9b48b174faf)
* [The 100% correct way to structure a React app (or why there’s no such thing)](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)
* [Clean Code saves Devs](https://developers.caffeina.com/clean-code-saves-devs-the-caffeina-approach-to-reactjs-1b56ad15aa64)
* [5 common practices that you can stop doing in React](https://blog.logrocket.com/5-common-practices-that-you-can-stop-doing-in-react-9e866df5d269)

### Folders organization

````
src/
  components/         # Presentational components
  containers/         # Container components
  i18n/               # Internationalization files
  pages/              # Container components used as router entrypoints
  services/           # Redux modules
  styles/             # styled-components related files
  utils/              # Utilities
  configureStore.js   # store configuration
  index.jsx           # app entrypoint
  index.template.html # HTML template (for webpack)
````

### Components

**Separate components into Container (smart) and Presentational (dumb) component types.**

&nbsp; | Container Components | Presentational Components
---: | --- | ---
**Location** | top level, route handlers | middle + leaf components
**Aware of Redux** | Yes | No
**Reading Data** | subscribe to Redux State | From props
**Changing Data** | dispatch Redux actions | invoke callbacks from props

Container and Presentational components are separated into separate, top-level folders in the `src` folder; with each component getting its own folder. Container components could also be located in `src/pages/` folder if they are router entrypoints (see [Routing](#routing) for more information).

These component folders could even potentially contain sub-component folders organized the same way if those sub-components:
* are directly related to or composed by the main component
* are not used elsewhere

````
src/
  components/
    Button/                           # Button is a Presentational component used in many components
      tests/
        Button.test.jsx
      Button.jsx
      Button.stories.jsx
      index.js
    ...

  containers/
    Root/
      components/
        Layout/                       # Layout contains components only used in the <Root /> container
          tests/                      # test files for these components
            RootWrapper.test.jsx
            SwitchWrapper.test.jsx
          index.js                    # rollup file (exports RootWrapper and SwitchWrapper)
          RootWrapper.jsx
          SwitchWrapper.js
        ...
      tests/
        Root.test.jsx                 # test file for the container
      index.js                        # rollup file
      Root.jsx                        # actual container
    ...
````

In each case, the `index.js` file is basically a rollup file to allow easier autoloading of the component module (that's why they are not included in the coverage - see `jest.config.js`).

````js
// src/components/Button/index.js

export { default } from './Button'
````

For every component, you should follow some basic rules:

* **Keep it small**: Keeping components small maximizes their potential for reuse, reduces the chance for bugs, allows them to focus on a single reponsibility and improves readability and testing. *If the render method has more than 10-20 lines, it's probably way too big.*

* **One per file**: You should try to put each component in its own file to ensure they are easier to read, maintain and test.

* **Declare `propTypes` and `defaultProps`** (when needed): propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much.

Components name should follow pascal case (eg. `CommentList`).

#### Container components

* Are concerned with **how things work**

* May contain both presentational and container components inside but **usually don’t have any DOM markup of their own** except for some wrapping divs, and never have any styles

* Provide the data and behavior to presentational or other container components

* Call Redux actions and provide these as callbacks to the presentational components

For testing purposes, **export both the connected** (as default) **and non-connected component** (as named export) - see the [Testing](#testing) section.

#### Presentational components

* Are concerned with **how things look**

* May contain both presentational and container components inside, and **usually have some DOM markup and styles of their own**

* Often allow containment/composition via `this.props.children`

* Have no dependencies on the rest of the app, such as Redux actions or state

* Don’t specify how the data is loaded or mutated

* Receive data and callbacks exclusively via props

* Rarely have their own state (when they do, it’s UI state rather than data)

* Should be written as functional components unless they need state, lifecycle hooks, or performance optimizations

**Presentational components should be styled using `styled-components`**:

````js
// src/components/Button/Button.jsx

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyle = styled.button.attrs({
  type: 'button',
})`
  padding: .5rem;
`

const Button = ({ children, ...rest }) => (
  <ButtonStyle {...rest}>
    {children}
  </ButtonStyle>
)

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Button.defaultProps = {
  children: null,
}

export default Button
````

### Redux

**Co-locate reducers, actions, action types, sagas and selectors**: organizing your redux related code around the reducer (*the slice of store state it manages*) by bundling your actions, action types, sagas and selectors with the reducer helps organize your code into reusable modules.

A redux module should be organized as follows:

````
src/services/
  basic/
    tests/
      actions.test.js
      reducer.test.js
      saga.test.js
      selectors.test.js
    actions.js    # named exports of action creators
    reducer.js    # default export reducer
    saga.js       # named exports of sagas
    selectors.js  # named exports of selectors
    types.js      # named exports of action types constants
````

#### Reducers

**Keep reducers pure, with no side-effects**: reducers should be pure functions. Redux works on the assumption that your state is immutable; and a reducer is intended to accept a state along with an action and return a new state (or the exact same state if nothing has changed).

Side-effects (ie. asynchronous things like data fetching) should be handled with [`Redux-Saga`](https://github.com/redux-saga/redux-saga) - see below for more information.

#### Action creators

Action creators should be written in camel case and begin with a verb (eg. `fetchCurrentUser`).

#### Action types

**Use string constants instead of inline strings** for action types. They should be uppercase, written in snake case and end with a verb.

Using a prefix for the action types based on the reducer they work with is a good way to namespace action types and ensure you don't get any collisions across reducers. **Prefixes should begin with `@@` and be lowercase**.

````js
// src/services/basic/types.js

export const FOO_UPDATE = '@@basic/FOO_UPDATE'
````

#### Sagas

To manage side effects in `Redux`, most tutorials use [`Redux-Thunk`](https://github.com/reduxjs/redux-thunk), which is a middleware allowing to write action creators that return a function instead of an action.

So why does this boilerplate use `Redux-Saga`?

> Contrary to redux thunk, you don't end up in callback hell, you can test your asynchronous flows easily and your actions stay pure.

Similar to regular reducers, sagas are functions that listen for dispatched actions. Additionally, they perform side effects and return their own actions back to a normal reducer.

By intercepting actions that cause side effects and handling them in their own way, we maintain the purity of reducers. This implementation uses generators, which allows us to write asynchronous code that reads like synchronous one. We don't need to worry about callbacks or race conditions since the generator function will automatically pause on each `yield` statement until complete before continuing.

Sagas consist in *workers* and *watchers* (which are both generator functions):
* Workers are responsible for *calling* asynchronous functions and *putting* new actions back to the reducer
* Watchers *watch* for dispatched actions and call the appropriate worker

Supposing we have the following types and actions to fetch some user data from a remote server:

````js
// src/services/users/types.js

export const USER_FETCH = '@@user/USER_FETCH'
export const SUCCESS_USER_FETCH = '@@user/SUCCESS_USER_FETCH'
export const FAILURE_USER_FETCH = '@@user/FAILURE_USER_FETCH'
````

````js
// src/services/users/actions.js

import * as types from './types'

export const fetchUser = () => ({
  type: types.USER_FETCH,
})

export const fetchUserSuccess = user => ({
  type: types.SUCCESS_USER_FETCH,
  user,
})

export const fetchUserFailure = error => ({
  type: types.FAILURE_USER_FETCH,
  error,
})
````

We can create a saga that watches for all `USER_FETCH` and triggers an API call to fetch the user data:

````js
// src/services/user/saga.js

import { call, put, takeEvery } from 'redux-saga/effects'

import callAPI from '...'

import * as actions from './actions'
import * as types from './types'

// Worker saga
export function* fetchUserWorker(action) {
  try {
    const user = yield call(callAPI.fetchUser, action.userId)
    // The following line dispatch a new action to the reducer
    yield put(actions.fetchUserSuccess(user))
  } catch (error) {
    // The following line dispatch a new action to the reducer
    yield put(actions.fetchUserFailure(error))
  }
}

// Watcher saga
// Every time types.USER_FETCH will be dispatched, fetchUserWorker will be started
export function* fetchUserWatcher() {
  yield takeEvery(types.USER_FETCH, fetchUserWorker)
}
````

This way, the reducer stays pure:

````js
// src/services/user/reducer.js

import * as types from './types'

export const initialState = {
  user: {},
  isLoading: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_FETCH:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS_USER_FETCH:
      return {
        ...state,
        user: action.user,
        isLoading: false,
        error: null,
      }
    case types.FAILURE_USER_FETCH:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default userReducer
````

To ensure clarity of your code, you should follow some basic rules when creating sagas:

* **Append *Worker* and *Watcher* at the end of sagas names** (eg. `fetchUserWorker`, `fetchUserWatcher`)
* **Dispatch actions imported from `./actions.js`** rather than creating them in sagas (ie. do not write `yield put({ type: types.FETCH_USER, user })`)
* Export both workers and watchers as **named exports**

#### Selectors

Selectors should be written in camel case and begin with *select* (eg. `selectCurrentUser`).

### Routing

> Routing is the process of keeping the browser URL in sync with what's being rendered on the page.

Routing is done with [`React-Router` v4](https://github.com/ReactTraining/react-router) which allows using React components.

**Every route, or *page*, should be defined as a new folder in the `src/pages/` folder**. As explained in the [Components](#components) section, pages are just Container components used as router entrypoints.

````
src/
  pages/
    Dashboard/    # dashboard page
    Settings/     # settings page
    index.js
````

#### Routes configuration

At the root of this folder, the `index.js` file is basically a configuration file: every route (and subroutes) should be defined in an array of objects that follow `<Route />` props (at least).

To actually create the routes (that will be injected in the `<Root />` container), we map through the array using an utility function (`makeCustomRoute`) that returns `<Route />` components based on the object.

````js
// src/pages/index.js

import { makeCustomRoute } from 'utils'

import Dashboard from './Dashboard'
import Settings from './Settings'

const routesConfig = [
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
  },
  {
    name: 'Dashboard',
    path: '/',
    exact: true,
    component: Dashboard,
  },
]

export default routesConfig.map(route => makeCustomRoute(route))
````

Note: `makeCustomRoute` is recursive. In case you want to create subroutes (eg. `/settings/users`), you should put them in the `routes` property of the parent route:

````js
// Example of subroutes configuration

const routesConfig = [
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
    routes: [
      {
        name: 'Users',
        path: '/users',
        component: UserSettings,
      }
    ]
  },
  ...
]
````

#### Code-splitting

To code-split the app automatically, this boilerplate uses [`react-loadable`](https://github.com/jamiebuilds/react-loadable).

Everytime you want to add a new route (or a subroute), **you should default export the Loadable component and import it in the route configuration**. To make this step smoothier, just use the `createAsyncComponent` utility function.

````js
// src/utils/createAsyncComponent.js

import loadable from 'react-loadable'

import LoadingComponent from 'components/Loading'

export default ({ loader, loading = LoadingComponent }) => loadable({
  loader, // Loader should be something like () => import('./Page')
  loading,
  delay: 300, // 0.3s
  timeout: 10000, // 10s
})
````

````js
// src/pages/Settings/index.js

import { createAsyncComponent } from 'utils'

export default createAsyncComponent({
  loader: () => import('./Settings' /* webpackChunkName: 'settings' */),
})
````

To make chunk names prettier (and readable), **you should use the *webpack magic comment* in the import function**: `/* webpackChunkName: 'settings' */`.

### i18n

Internationalization is handled by [`react-intl`](https://github.com/yahoo/react-intl).

Instead of using `<IntlProvider />` from the package, we use a custom provider named `<LanguageProvider />` which is basically the same component but **connected** to the store. This way, you are able to dispatch an action to change the locale of the whole app.

For every component that contain strings to be translated, **you should create a file named `messages.js` at the root of the folder**.

````js
// src/pages/Dashboard/messages.js

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'pages.Dashboard.title',
    defaultMessage: 'Dashboard',
  },
  subtitle: {
    id: 'pages.Dashboard.subtitle',
    defaultMessage: 'Some interesting things to be written here',
  },
})
````

This file must be imported in the component one and used with `<FormattedMessage />`.

````js
// src/pages/Dashboard/Dashboard.jsx

...

import messages from './messages'

...
  <h1>
    <FormattedMessage {...messages.title} />
  </h1>
...
````

**Translations files must be located in the `src/i18n/translations/` folder, named after their language**:

````js
// src/i18n/translations/fr.json

{
  "pages.Dashboard.title": "Tableau de bord",
  "pages.HomePage.subtitle": "Quelques informations importantes seront écrites ici"
}
````

In order to make this process as smooth as possible, **you can use a script to automatically extract all defined messages**:

````
yarn extract:msg
````

This script will search for messages in the `src/` directory, check if they do not exist and update the translation files. `defaultMessage` is automatically saved as the default language (in this boilerplate, English).

### Utilities

Utilities - or helper functions - should be located in the `src/utils/` folder and follow a few rules:

* One function per file, exported as default
* A named export per function in `src/utils/index.js`
* Utility should be imported from `utils` as a named import instead of its own file

### Naming things

#### General

* Boolean variables, or functions that return a boolean value, should start with `is`, `has` or `should`
* Functions should be named for what they do, not how they do it

#### Event and event handlers

Event names should:

* be written in camel case
* begin with `on`
* not clash with native event names

Event handlers should:

* be written in camel case
* begin with `handle`
* end with the name of the event they handle (eg. `Click`, `Move`...)
* be present-tense

## Development

### Type checking

Type checking is done with [`PropTypes`](https://github.com/facebook/prop-types).

As explained in the [Components](#components) section, you should declare `propTypes` and `defaultProps` for every component that have props.

### Linting

Linting is done with [`ESLint`](https://eslint.org) and can be executed manually with `yarn lint`. Even though it's automatically executed before every commit (thanks to `husky`'s `precommit` hook), installing an ESLint plugin for your IDE is highly recommended.

The configuration is based on `eslint-config-airbnb`, with some additional rules and plugins. Please refer to `.eslintrc.json` for more information.

### Testing

#### Unit Testing

This boilerplate uses [`Jest`](https://github.com/facebook/jest) as a test runner, assertion library and mocking library, and [`Enzyme`](https://github.com/airbnb/enzyme) to provide additional testing utilities to interact with elements.

As unit tests are not just about components, **almost every folder in the `src` directory should have a `tests` folder** containing test files that should be named after the file they refer to and end with `.test.js` or `.test.jsx`.

To run the tests, just type `yarn test` in the terminal. When all tests are run, you will see a coverage report that may help you implement other tests.

**Testing components**

Assuming we have a Presentational Component named `Button` in `src/components/Button`, here's how to write a basic test to check if it's defined, if it's rendering correctly, if `styled-components` did its job, and if the `click` event is called:

````js
// src/components/Button/tests/Button.test.jsx

import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Button from '../Button'

const mockFn = jest.fn()

describe('<Button />', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined()
  })
  it('should render correctly', () => {
    const text = 'Text'
    const tree = shallow(
      <Button>
        {text}
      </Button>,
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have style rules', () => {
    const tree = shallow(
      <Button />,
    )
    expect(tree).toHaveStyleRule('padding', '.5rem')
  })
  it('should call mock function when button is clicked', () => {
    const tree = shallow(
      <Button onClick={mockFn}>
        Click me
      </Button>,
    )
    tree.simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})
````

For Container Components, you should import the named export to test the component itself and not the Redux-decorated one (as Redux is already tested).

````js
// src/containers/Root/tests/Root.test.jsx

import React from 'react'
import { shallow } from 'enzyme'

import { Root } from '../Root' // We import the component itself, not the connected one

...
````

**Testing Redux related stuff**

*Reducers*

A reducer should return the new state after applying the action to the previous state.

````js
import * as types from './types'

export const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
  },
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TODO_ADD:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
        ...state
      ]
    default:
      return state
  }
}

export default reducer
````

This reducer can be tested like:

````js
import reducer, { initialState } from '../reducer'
import * as types from '../types'

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle TODO_ADD', () => {
    const testTodo = {
      type: types.TODO_ADD,
      text: 'Run the tests',
    }
    expect(reducer([], testTodo)).toEqual([testTodo])
    expect(reducer(initialState, testTodo)).toEqual([testTodo, initialState])
  })
})
````

*Action creators*

When testing action creators, we want to test whether the correct action creator was called and also whether the right action was returned.

````js
import * as types from './types'

export const addTodo = (text) => {
  return {
    type: types.TODO_ADD,
    text,
  }
}
````

This action creator could be tested like:

````js
import * as actions from '../actions'
import * as types from '../types'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.TODO_ADD,
      text,
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })
})
````

*Sagas*

A nice benefit of using `Redux-Saga` and generator functions is that our async code becomes less complicated to test. We don't need to worry about mocking API services since all we care about are the action objects that our sagas output.

Let's use the worker saga used in the Guidelines section:

````js
...

// Worker saga
export function* fetchUserWorker(action) {
  try {
    const user = yield call(callAPI.fetchUser, action.userId)
    // The following line dispatch a new action to the reducer
    yield put(actions.fetchUserSuccess(user))
  } catch (error) {
    // The following line dispatch a new action to the reducer
    yield put(actions.fetchUserFailure(error))
  }
}

...
````

This saga could be tested like:

````js
import { call, put } from 'redux-saga/effects'

import callAPI from '...'
import { fetchUserWorker } from '../saga'
import * as types from '../types'

describe('saga', () => {
  const gen = fetchUserWorker()
  it('should call the  API', () => {
    expect(gen.next().value).toEqual(call(callAPI))
  })
  it('should dispatch a fetchUserSuccess action if successful', () => {
    const user = {
      userId: 1337,
      username: 'Foo',
    }
    expect(gen.next(user).value).toEqual(put({
      type: types.SUCCESS_USER_FETCH,
      user,
    }))
  })
  it('should dispatch a fetchUserFailure if unsuccessful', () => {
    const error = {
      text: 'Something went wrong!',
    }
    expect(gen.throw(error).value).toEqual(put({
      type: types.FAILURE_USER_FETCH,
      error,
    }))
  })
  it('should be done', () => {
    expect(gen.next().done).toEqual(true)
  })
})
````

*Selectors*

````js
import { createSelector } from 'reselect'

export const selectTodoState = ({ todos }) => todos

export const selectCompletedTodos = () => createSelector(selectTodoState, state => state.filter(todo => todo.completed))
````

This selector could be tested like:

````js
import { selectTodoState, selectCompletedTodos } from '../selectors'

describe('selectors', () => {
  let mockState
  beforeAll(() => {
    mockState = {
      todos: [
        {
          text: 'Finish docs',
          completed: false,
          id: 1,
        },
        {
          text: 'Use Redux',
          completed: true,
          id: 0,
        },
      ]
    }
  })
  it('selectTodoState() should return todo state', () => {
    const todoState = selectTodoState(mockState)
    expect(todoState).toEqual(mockState.todos)
  })
  it('selectCompletedTodos() should return completed todos', () => {
    const completedTodos = selectCompletedTodos().resultFunc(mockState.todos)
    expect(completedTodos).toEqual([
      {
        text: 'Use Redux',
        completed: true,
        id: 0,
      }
    ])
  })
})
````

Sources:
* [Redux - Writing tests](https://redux.js.org/recipes/writingtests)
* [How to Manage Side Effects with Redux-Saga](https://www.lullabot.com/articles/eat-this-its-safe)
* [Unit testing React, Redux, Selectors and Epics](https://codeburst.io/unit-testing-react-redux-selectors-and-epics-664e7b4798a8)

#### UI Testing

This boilerplate uses [`Storybook`](https://github.com/storybooks/storybook) to test components, as well as to provide a kind of style guide, with the following addons:

* [`actions`](https://github.com/storybooks/storybook/tree/release/3.4/addons/actions) to display data received by event handlers

* [`notes`](https://github.com/storybooks/storybook/tree/release/3.4/addons/notes) to ... write notes

**Each Presentational Component** (as defined in the [Guidelines](#guidelines)) **should have a file containing a set of stories** (ie. a set of *states* of the component) named after the component that end with `.stories.jsx`, located right next to this component.

Assuming we have a `Button` component in `src/components/Button`, here's how to write a story:

````js
// src/components/Button/Button.stories.jsx

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
````

### Transpiling

This boilerplate uses [Babel](https://babeljs.io/) to transpile ES6/ES7 code to ES5, with the following plugins:

* `dynamic-import-node` to allow Node to recognize the `import` function (otherwise, `Jest` throws an error while running tests) [*test only*]

* `module-resolver` to add new "root" directories that contain modules (ie. write `components/Button` instead of `../../../components/Button`)

* `polished` to compile away polished helpers

* `react-hot-loader/babel` to make React components work with Hot Module Reloading [*development only*]

* `styled-components`

* `syntax-dynamic-import` to allow Babel to recognize the `import` function ([in order to lazy load chunks with webpack]((https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)))

* `transform-class-properties` to drop class constructors thanks to property initializer and `.bind(this)` thanks to lexical scoping of fat arrow functions

* `transform-object-rest-spread`

* `transform-runtime` to transform generator functions to use a regenerator runtime that does not pollute the global scope (for `redux-saga`)

## Version control

### Commit messages

**Write your commit message in the imperative** (*Fix bug* and not *Fixed bug* or *Fixes bug*). This convention matches up with commit messages generated by commands like `git merge` and `git revert`.

To help figure out at a glance what kind of changes have been made, **prepend every commit message with an emoji** with this form:

````
<emoji> commit message
````

Depending on the commit, these emojis should be used:

Commit type | Emoji
--- | ---
Initial commit | :tada: `:tada:`
Version tag | :bookmark: `:bookmark:`
New feature | :sparkles: `:sparkles:`
Bugfix | :bug: `:bug:`
Metadata | :card_index: `:card_index:`
Documentation | :books: `:books:`
Documenting source code | :bulb: `:bulb:`
Performance | :racehorse: `:racehorse:`
Cosmetic | :lipstick: `:lipstick:`
Tests | :rotating_light: `:rotating_light:`
Adding a test | :white_check_mark: `:white_check_mark:`
General update | :zap: `:zap:`
Improve format/structure | :art: `:art:`
Refactor code | :hammer: `:hammer:`
Removing code/files | :fire: `:fire:`
Continuous Integration | :green_heart: `:green_heart:`
Security | :lock: `:lock:`
Upgrading dependencies | :arrow_up: `:arrow_up:`
Downgrading dependencies | :arrow_down: `:arrow_down:`
Lint | :shirt: `:shirt:`
Translation | :alien: `:alien:`
Text | :pencil: `:pencil:`
Critical hotfix | :ambulance: `:ambulance:`
Deploying stuff | :rocket: `:rocket:`
Fixing on MacOS | :apple: `:apple:`
Fixing on Linux | :penguin: `:penguin:`
Fixing on Windows | :checkered_flag: `:checkered_flag:`
Work in progress | :construction:  `:construction:`
Adding CI build system | :construction_worker: `:construction_worker:`
Analytics or tracking code | :chart_with_upwards_trend: `:chart_with_upwards_trend:`
Removing a dependency | :heavy_minus_sign: `:heavy_minus_sign:`
Adding a dependency | :heavy_plus_sign: `:heavy_plus_sign:`
Docker | :whale: `:whale:`
Configuration files | :wrench: `:wrench:`
Merging branches | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:`
Bad code / need improv. | :hankey: `:hankey:`
Reverting changes | :rewind: `:rewind:`
Breaking changes | :boom: `:boom:`
Code review changes | :ok_hand: `:ok_hand:`
Accessibility | :wheelchair: `:wheelchair:`

Source: [Git Commit Emoji](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)

### Versioning

Versions must follow [Semantic Versioning](https://semver.org/), also known as *semver*.

Yarn may be used to update package's version and create a git tag using this command:

````
yarn version --new-version <version>
````

Additionally, Yarn provides features to bump versions:

* If you are **fixing bugs**, then this would be categorized as a patch, in which case you should use `yarn version --patch`

* If you are implementing new features in a **backwards-compatible manner**, then this would be categorized as a minor version, in which case you should use `yarn version --minor`

* If you implement new stuff that is likely to **break the existing codebase**, then this would be categorized as a major version, in which case you should use `yarn version --major`

Note: Git messages will be prepended by `:bookmark:` (:bookmark:) to follow the guidelines about commit messages (thanks to `.yarnrc`).
