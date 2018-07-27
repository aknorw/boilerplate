import React from 'react'
import { render } from 'react-dom'

import App from 'components/App'

const MOUNT_NODE = document.getElementById('root')

// Prefer to wrap the app to use hydrate for SSR
const wrapApp = Component => (
  <Component />
)

render(wrapApp(App), MOUNT_NODE)
