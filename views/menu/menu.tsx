import styles from './menu.module.css'
import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Menu = () => {
  return (
    <header className={styles.uaheader}>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='ACME Inc.'
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
}

export default memo(Menu)
