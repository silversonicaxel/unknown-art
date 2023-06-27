import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'
import styles from './menu.module.css'

export const Menu: FC = memo(() => {
  return (
    <header className={styles.uaheader}>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='logo unknown art'
          width={80}
          height={80}
          className={styles.ualogo}
          role='navigation'
          aria-label='main logo'
        />
      </Link>

      <nav className={styles.uanav}>
        <ul aria-labelledby='menu'>
          <li>
            <Link href='/'>home</Link>
          </li>
          <li>
            <Link href='/places'>places</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
})

Menu.displayName = 'Menu'
