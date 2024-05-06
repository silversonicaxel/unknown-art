import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'
import styles from './menu.module.css'

export const Menu: FC = memo(() => {
  return (
    <nav className={styles.uamenu}>
      <ul aria-labelledby='menu'>
        <li>
          <Link href='/' aria-label='home'>
            home
          </Link>
        </li>
        <li>
          <Link href='/places' aria-label='places'>
            places
          </Link>
        </li>
      </ul>
    </nav>
  )
})

Menu.displayName = 'Menu'
