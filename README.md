# Boilerplate

## Table of contents

* [Features](#features)
* [Scripts](#scripts)
* [Guidelines](#guidelines)
  * [Folders organization](#folders-organization)
  * [Components](#components)
  * [Redux](#redux)
  * [Routing](#routing)
  * [Utilities](#utilities)
  * [Naming things](#naming-things)
* [Development](#development)
  * Logging :construction:
  * [Type checking](#type-checking)
  * [Linting](#linting)
  * [Testing](#testing)
  * [Transpiling](#transpiling)
  * Building :construction:
  * Continuous Integration / Continuous Development :construction:
* [Version control](#version-control)
  * [Commit messages](#commit-messages)
  * [Versioning](#versioning)

## Features

* [`React`](https://github.com/facebook/react)
* [`Redux`](https://github.com/reduxjs/redux) and [`React-Redux`](https://github.com/reduxjs/react-redux) to manage the state
* [`Reselect`](https://github.com/reduxjs/reselect) to build memoized selectors
* [`Styled-Components`](https://github.com/styled-components/styled-components) to write CSS-in-JS
* [`React-Router`](https://github.com/ReactTraining/react-router) to manage routes and [`Connected-React-Router`](https://github.com/supasate/connected-react-router) to sync history with `redux`
* [`React-Helmet`](https://github.com/nfl/react-helmet) to manage head tags easily

## Scripts

> :warning: The package manager used with this boilerplate is [**Yarn**](https://yarnpkg.com)

Script | Explanation
--- | ---
`yarn clean` | Remove `dist` folder
`yarn lint` | Lint `src` folder
`yarn test` | Run tests
`yarn storybook` | Run the storybook on port 9001
`yarn dev` | Run application (HMR)
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
    Button/
      tests/
        Button.test.jsx
      Button.jsx
      Button.stories.jsx
      index.js
    ...

  containers/
    Root/
      components/
        Layout/
          tests/
            RootWrapper.test.jsx
            SwitchWrapper.test.jsx
          index.js
          RootWrapper.jsx
          SwitchWrapper.js
        Navbar/
          ...
      tests/
        Root.test.jsx
      index.js
      Root.jsx
    ...
````

In each case, the `index.js` file is basically a rollup file to allow easier autoloading of the component module (that's why they are not included in the coverage - see `jest.config.js`).

````js
// src/components/Button/index.js

import Button from './Button'

export default Button
````

For every component, you should follow some basic rules:

* **Keep it small**: Keeping components small maximizes their potential for reuse, reduces the chance for bugs, allows them to focus on a single reponsibility and improves readability and testing. *If the render method has more than 10-20 lines, it's probably way too big.*

* **One per file**: You should try to put each component in its own file to ensure they are easier to read, maintain and test.

* **Declare `propTypes` and `defaultProps`**: propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much.

Components name should follow pascal case (eg. `CommentList`).

#### Container components

* Are concerned with **how things work**

* May contain both presentational and container components inside but **usually don’t have any DOM markup of their own** except for some wrapping divs, and never have any styles

* Provide the data and behavior to presentational or other container components

* Call Redux actions and provide these as callbacks to the presentational components

For testing purposes, **export both the connected** (as default) **and non-connected component** (as named export).

#### Presentational components

* Are concerned with **how things look**

* May contain both presentational and container components inside, and **usually have some DOM markup and styles of their own**

* Often allow containment/composition via `this.props.children`

* Have no dependencies on the rest of the app, such as Redux actions or state

* Don’t specify how the data is loaded or mutated

* Receive data and callbacks exclusively via props

* Rarely have their own state (when they do, it’s UI state rather than data)

* Should be written as functional components unless they need state, lifecycle hooks, or performance optimizations

Presentational components should be styled using `styled-components`:

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

**Co-locate reducers, actions, action types and selectors**: organizing your redux related code around the reducer (*the slice of store state it manages*) by bundling your actions, action types and selectors with the reducer helps organize your code into reusable modules.

A redux module should be organized as follows:

````
src/services/
  basic/
    tests/
      actions.test.js
      reducer.test.js
      selectors.test.js
    actions.js    # named exports of action creators
    reducer.js    # default export reducer
    selectors.js  # named exports of selectors
    types.js      # named exports of action types constants
````

#### Reducers

**Keep reducers pure, with no side-effects**: reducers should be pure functions. Redux works on the assumption that your state is immutable; and a reducer is intended to accept a state along with an action and return a new state (or the exact same state if nothing has changed).

#### Action creators

Action creators should be written in camel case and begin with a verb (eg. `fetchCurrentUser`).

#### Action types

**Use string constants instead of inline strings** for action types. They should be uppercase, written in snake case and end with a verb.

Using a prefix for the action types based on the reducer they work with is a good way to namespace action types and ensure you don't get any collisions across reducers. **Prefixes should begin with `@@` and be lowercase**.

````js
// src/services/basic/types.js

export const FOO_UPDATE = '@@basic/FOO_UPDATE'
````

#### Selectors

Selectors should be written in camel case and begin with *select* (eg. `selectCurrentUser`).

### Routing

> Routing is the process of keeping the browser URL in sync with what's being rendered on the page.

Routing is done with [`React-Router` v4](https://github.com/ReactTraining/react-router) which allows using React components.

Every route, or *page*, should be defined as a new folder in the `src/pages/` folder. As explained in the [Components](#components) section, pages are just Container components used as router entrypoints.

````
src/
  pages/
    Dashboard/    # dashboard page
    Settings/     # settings page
    index.js
````

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

##### Components

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

**Differences between `mount`, `shallow` and `render`**

* `mount` renders child components
  * This is ideal for use cases where you have components that may interact with DOM API, or use React lifecycles methods in order to fully test the component
  * As it actually mounts the component in the DOM `.unmount()` should be called after each tests to stop tests affecting each other
  * Allows access to both props directly passed into the root component (including default props) and props passed into child components


* `shallow` renders only the single component, not including its children
  * This is useful to isolate the component for pure unit testing. It protects against changes or bugs in a child component altering the behaviour or output of the component under test
  * Components do have access to lifecycle methods by default (Enzyme 3)
  * Cannot access props passed into the root component (therefore also not default props), but can those passed into child components, and can test the effect of props passed into the root component. This is as with `shallow(<MyComponent />)`, you're testing what `MyComponent` renders - not the element you passed into `shallow`


* `render` renders to static HTML, including children
  * Does not have access to React lifecycle methods
  * Less costly than `mount` but provides less functionality

Source: [Testing React with Jest and Enzyme](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)

##### Redux

**Reducers**

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

**Action creators**

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

**Selectors**

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

* `module-resolver` to add new "root" directories that contain modules (ie. write `components/Button` instead of `../../../components/Button`)

* `react-hot-loader/babel` to make React components work with Hot Module Reloading [*development only*]

* `styled-components`

* `syntax-dynamic-import` to allow Babel to recognize the `import` function ([in order to lazy load chunks with webpack]((https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)))

* `transform-class-properties` to drop class constructors thanks to property initializer and `.bind(this)` thanks to lexical scoping of fat arrow functions

* `transform-object-rest-spread`

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
