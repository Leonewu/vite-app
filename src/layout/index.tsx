import React from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.css'
import Router from '@/routes'

export default () => {
  return (
    <Layout className={styles.layout}>
      <Layout.Header>header</Layout.Header>
      <Layout>
        <Layout.Sider className={styles.sider}>sider</Layout.Sider>
        <Layout style={{ padding: 24 }}>
          <Layout.Content className={styles.content}>
            <Router />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
