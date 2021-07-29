import React, { useState, useMemo, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.css'
import { flatRoutes, routes } from '@/router/routes'
import type { RouteItem } from '@/router/routes'
import { useLocation, useHistory } from 'react-router-dom'

export default React.memo(() => {
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
  const [collapsed, setCollapsed] = useState(false)
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
        <Menu.SubMenu
          key={fullpath}
          title={item.name}
          icon={Icon}
          popupClassName={styles.submenu}
        >
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
  const CALLAPSED_WIDTH = 80
  const WIDTH = 200
  const width = collapsed ? CALLAPSED_WIDTH : WIDTH
  return (
    <>
      <div
        style={{
          transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s',
          width: `${width}px`,
          minWidth: `${width}px`,
          maxWidth: `${width}px`,
          // flex: `0 0 ${width}px`
        }}
      />
      <Layout.Sider
        width={WIDTH}
        collapsedWidth={CALLAPSED_WIDTH}
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={(c) => {
          setCollapsed(c)
        }}
      >
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={(k) => setOpenKeys(k as string[])}
        >
          {routes.map((route) => renderSiderMenu(route))}
        </Menu>
      </Layout.Sider>
    </>
  )
})
