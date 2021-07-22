import React, { useMemo } from 'react'
import styles from './index.module.css'
import avatar from './avatar.jpg'
import { ReactComponent as link } from './link.svg'

export default () => {
  const navs = [
    {
      name: 'Home',
    },
    {
      name: 'GitHub',
      icon: link,
    },
  ]
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <img src={avatar} alt="" />
        <span>Leone&#39;s website</span>
      </div>
      <nav className={styles.nav}>
        {navs.map((nav) => {
          return (
            <div key={nav.name} className={styles.navItem}>
              <span>{nav.name}</span>
              {nav.icon && <nav.icon />}
            </div>
          )
        })}
      </nav>
    </header>
  )
}
