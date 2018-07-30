import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const CustomRoute = ({ path, component, ...rest }, prefix = null) => {
  const realPath = prefix ? prefix + path : path
  const route = (
    <Route
      key={realPath}
      path={realPath}
      component={component}
    />
  )
  if (rest.routes) {
    return rest.routes.map(r => CustomRoute(r, path))
  }
  return route
}

CustomRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
}

export default CustomRoute
