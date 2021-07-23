import React, { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.css'
import { flatRoutes } from '@/router/routes'
import type { RouteItem } from '@/router/routes'
import Router from '@/router'
import { useLocation, useHistory } from 'react-router-dom'
import Header from './header'
import Sider from './sider'

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

  function renderSiderMenu(item: RouteItem, parentPath?: string) {
    if (!item.path || item.path === '/' || item.path === '*' || item.hide) {
      return null
    }
    const Icon = item.icon ? <item.icon /> : null
    const fullpath = `${parentPath || ''}${item.path}`
    if (item.children) {
      const children = (item.children || []).map((child) =>
        renderSiderMenu(child, `${parentPath || ''}${item.path}`)
      )
      return (
        <Menu.SubMenu key={fullpath} title={item.name} icon={Icon}>
          {children}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item
        key={fullpath}
        icon={Icon}
        onClick={() => history.push(fullpath)}
      >
        {item.name}
      </Menu.Item>
    )
  }

  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout>
        {!hideSider && <Sider />}
        <Layout style={{ padding: 24 }}>
          <Layout.Content className={styles.content}>
            <Router />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
