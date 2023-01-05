import styles from './menu.module.css'
import { memo } from 'react'
import Link from 'next/link'

const Menu = () => {
  return (
    <nav className={styles.uanav}>
      <ul>
        <li>
          <Link href='/'>home</Link>
        </li>
        <li>
          <Link href='places'>places</Link>
        </li>
      </ul>
    </nav>
  )
}

export default memo(Menu)
