# Boilerplate

## Table of contents

* [Features](#features)
* [Scripts](#scripts)
* [Guidelines](#guidelines)
  * Folders organization :construction:
* [Development](#development)
  * Logging :construction:
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

## Development

### Linting

Linting is done with [`ESLint`](https://eslint.org) and can be executed manually with `yarn test`. Even though it's automatically executed before every commit (thanks to `husky`'s `precommit` hook), installing an ESLint plugin for your IDE is highly recommended.

The configuration is based on `eslint-config-airbnb`, with some additional rules and plugins. Please refer to `.eslintrc.json` for more information.

### Testing

#### Unit Testing

This boilerplate uses [`Jest`](https://github.com/facebook/jest) as a test runner, assertion library and mocking library, and [`Enzyme`](https://github.com/airbnb/enzyme) to provide additional testing utilities to interact with elements.

As unit tests are not just about components, **almost every folder in the `src` directory should have a `tests` folder** containing test files that should be named after the file they refer to and end with `.test.js` or `.test.jsx`.

To run the tests, just type `yarn test` in the terminal. When all tests are run, you will see a coverage report that may help you implement other tests.

In case you encounter errors about snapshots, just run `yarn test:update` instead of `yarn test` to update the snapshots.

##### Components

Assuming we have a Presentational Component named `Button` in `src/components/Button`, here's how to write a basic test to check if it's defined, if it's rendering correctly and if the `click` event is called:

````js
// src/components/Button/tests/Button.test.jsx

import React from 'react'
import { shallow } from 'enzyme'

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

> **Differences between `mount`, `shallow` and `render`**
>
> * `mount` renders child components
  * This is ideal for use cases where you have components that may interact with DOM API, or use React lifecycles methods in order to fully test the component
  * As it actually mounts the component in the DOM `.unmount()` should be called after each tests to stop tests affecting each other
  * Allows access to both props directly passed into the root component (including default props) and props passed into child components
>
>
> * `shallow` renders only the single component, not including its children
  * This is useful to isolate the component for pure unit testing. It protects against changes or bugs in a child component altering the behaviour or output of the component under test
  * Components do have access to lifecycle methods by default (Enzyme 3)
  * Cannot access props passed into the root component (therefore also not default props), but can those passed into child components, and can test the effect of props passed into the root component. This is as with `shallow(<MyComponent />)`, you're testing what `MyComponent` renders - not the element you passed into `shallow`
>
>  
> * `render` renders to static HTML, including children
  * Does not have access to React lifecycle methods
  * Less costly than `mount` but provides less functionality
>
> Source: [Testing React with Jest and Enzyme](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)

#### UI Testing

This boilerplate uses [`Storybook`](https://github.com/storybooks/storybook) to test components, as well as to provide a kind of style guide, with the following addons:

* [`actions`](https://github.com/storybooks/storybook/tree/release/3.4/addons/actions) to display data received by event handlers

* [`notes`](https://github.com/storybooks/storybook/tree/release/3.4/addons/notes) to ... write notes

**Each Presentational Component** (as defined in the [Guidelines](#Guidelines)) **should have a file containing a set of stories** (ie. a set of *states* of the component) named after the component that end with `.stories.jsx`, located right next to this component.

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
