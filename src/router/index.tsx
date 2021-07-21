import React from 'react'
import { routes } from './routes'
import type { RouteItem } from './routes'
import { Redirect, Route, Switch } from 'react-router-dom'

function renderRoute(route: RouteItem) {
  const fullpath = route._parentPath
    ? `${route._parentPath}${route.path}`
    : route.path
  return (
    <Route
      exact={!(route.children!?.length > 0)}
      path={fullpath}
      key={fullpath || ''}
      render={(props) => {
        if (route.redirect) {
          if (route.component) {
            console.warn(
              `route: ${route.path} should't have redirect and component at the same time.Remove one of them`
            )
          }
          return <Redirect to={route.redirect} />
        }
        if (route.children?.length) {
          const children = route.children.map((child) => {
            return renderRoute({ ...child, _parentPath: fullpath })
          })
          if (!route.component) {
            return <Switch>{children}</Switch>
          }
          return (
            <route.component {...props}>
              <Switch>{children}</Switch>
            </route.component>
          )
        }
        return route.component ? <route.component {...props} /> : null
      }}
    ></Route>
  )
}

export default function Routes() {
  return <Switch>{routes.map((route) => renderRoute(route))}</Switch>
}
