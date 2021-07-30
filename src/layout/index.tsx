import React, { useMemo, useEffect } from 'react'
import styles from './index.module.css'
import { flatRoutes } from '@/router/routes'
import Router from '@/router'
import { useLocation } from 'react-router-dom'
import Header from './header'
import Sider from './sider'

export default () => {
  const location = useLocation()
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

  useEffect(() => {
    if (!hideLayout) {
      document.body.classList.add(styles.bg)
    } else {
      document.body.classList.remove(styles.bg)
    }
    return () => {
      document.body.classList.remove(styles.bg)
    }
  }, [hideLayout])

  if (hideLayout) {
    return <Router />
  }

  return (
    <div className={styles.layout}>
      <Header />
      <section className={styles.section}>
        {!hideSider && <Sider />}
        <article className={styles.content}>
          <Router />
        </article>
      </section>
    </div>
  )
}
