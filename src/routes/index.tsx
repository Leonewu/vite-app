import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import loadable from '@loadable/component'

const Sandwiches = loadable(() => import('@/page/Sandwiches'))
const Tacos = loadable(() => import('@/page/Tacos'))
const perfScreen = loadable(() => import('@/page/perf-screen'))
const routes = [
  {
    path: '/sandwiches',
    component: Sandwiches,
  },
  {
    path: '/tacos',
    component: Tacos,
  },
  {
    path: '/perf-screen',
    component: perfScreen,
  },
]

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props: any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export default function BrowserRouter() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  )
}
