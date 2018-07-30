import { makeCustomRoute } from 'utils'

// Every time we add a new page, we have to import the container components
// When react-loadable will be implemented, we will have to import the Loadable component
import Homepage from './Homepage'
import Settings from './Settings'

// Keys must follow react-router <Route /> props (at least)
export const routesConfig = [
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
  },
  {
    name: 'Homepage',
    path: '/',
    exact: true,
    component: Homepage,
  },
]

export default routesConfig.map(route => makeCustomRoute(route))
