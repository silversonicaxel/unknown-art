import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

import styles from './menu.module.css'


export const Menu: FC = memo(() => {
  return (
    <nav className={styles.uamenu} aria-label="unknown art menu">
      <ul aria-labelledby="menu" role="menubar" aria-label="unknown art menu">
        <li role="none">
          <Link href="/" role="menuitem" aria-label="home page">
            home
          </Link>
        </li>
        <li role="none">
          <Link href="/places" role="menuitem" aria-label="places page">
            places
          </Link>
        </li>
      </ul>
    </nav>
  )
})

Menu.displayName = 'Menu'
