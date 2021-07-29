import React from 'react'
import styles from './index.module.css'
import avatar from './avatar.jpg'
import { ReactComponent as link } from './link.svg'
import { useHistory } from 'react-router'
import Mode from './mode'

export default React.memo(() => {
  const history = useHistory()
  const navs = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'About me',
      url: '/about',
    },
    {
      name: 'GitHub',
      icon: link,
      url: 'https://github.com/Leonewu',
      newTab: true,
    },
  ]
  return (
    <header className={styles.header}>
      <div className={styles.bg} />
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <img src={avatar} alt="" />
          {/* <span>Leone&#39;s website</span> */}
          <span>👋 Hi there!</span>
        </div>
        <nav className={styles.nav}>
          {navs.map((nav) => {
            const isInternal = nav.url?.startsWith('/') && !nav.newTab
            return (
              <a
                key={nav.name}
                className={styles.navItem}
                href={nav.url}
                target={nav.newTab ? '_blank' : '_self'}
                rel="noreferrer"
                onClick={(e) => {
                  if (isInternal && nav.url) {
                    history.push(nav.url!)
                    e.preventDefault()
                    return false
                  }
                }}
              >
                <span>{nav.name}</span>
                {nav.icon && <nav.icon />}
              </a>
            )
          })}
          <Mode />
        </nav>
      </div>
    </header>
  )
})
