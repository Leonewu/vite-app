import React, { useState, useMemo, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.css'
import { flatRoutes, routes } from '@/router/routes'
import type { RouteItem } from '@/router/routes'
import { useLocation, useHistory } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const history = useHistory()

  const currentRoute = useMemo(() => {
    return flatRoutes.find((r) => r.fullpath === location.pathname)
  }, [location])

  const defaultOpenKeys = useMemo(() => {
    const keys = []
    let cur = currentRoute
    while (cur) {
      if (cur?.fullpath) {
        keys.unshift(cur.fullpath)
      }
      cur = cur.parent
    }
    return keys
  }, [currentRoute])

  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys)
  const [selectedKeys, setSelectedKeys] = useState<string[]>()

  useEffect(() => {
    if (currentRoute?.fullpath) {
      setSelectedKeys([currentRoute.fullpath])
    } else {
      setSelectedKeys([])
    }
  }, [currentRoute])

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
    <Layout.Sider className={styles.sider} collapsible>
      <Menu
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={(k) => setOpenKeys(k as string[])}
      >
        {routes.map((route) => renderSiderMenu(route))}
      </Menu>
    </Layout.Sider>
  )
}
