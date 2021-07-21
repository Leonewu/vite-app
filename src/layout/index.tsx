import React, { Children, useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.css'
import { flatRoutes, routes } from '@/router/routes'
import type { RouteType } from '@/router/routes'
import Router from '@/router'
import { useLocation, useHistory } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const history = useHistory()
  const currentRoute = useMemo(() => {
    return flatRoutes.find((r) => r.fullpath === location.pathname)
  }, [location])

  const hideLayout = useMemo(() => {
    let flag = false
    let cur = currentRoute
    while (cur) {
      if (cur.layout === false) {
        flag = true
        break
      }
      cur = cur.parent
    }
    return flag
  }, [currentRoute])

  const hideSider = useMemo(() => {
    let flag = false
    let cur = currentRoute
    while (cur) {
      if (cur.sider === false) {
        flag = true
        break
      }
      cur = cur.parent
    }
    return flag
  }, [currentRoute])

  if (hideLayout) {
    return <Router />
  }

  function renderSiderMenu(item: RouteType, parentPath?: string) {
    if (!item.path || item.path === '/') return null
    if (item.children) {
      const children = (item.children || []).map((child) =>
        renderSiderMenu(child, `${parentPath || ''}${item.path}`)
      )
      return (
        <Menu.SubMenu key={item.path} title={item.name}>
          {children}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item
        key={item.path}
        onClick={() => history.push(`${parentPath || ''}${item.path}`)}
      >
        {item.name}
      </Menu.Item>
    )
  }

  return (
    <Layout className={styles.layout}>
      <Layout.Header>header</Layout.Header>
      <Layout>
        {!hideSider && (
          <Layout.Sider className={styles.sider}>
            <Menu mode="inline">
              {routes.map((route) => renderSiderMenu(route))}
            </Menu>
          </Layout.Sider>
        )}
        <Layout style={{ padding: 24 }}>
          <Layout.Content className={styles.content}>
            <Router />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
