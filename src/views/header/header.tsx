import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import styles from './header.module.css'

import { Menu } from 'src/views/menu'


export const Header: FC = () => {
  return (
    <>
      <header className={styles.uaheader}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo unknown art"
            width={80}
            height={80}
            className={styles.uaheader_logo}
            role="navigation"
            aria-label="main logo"
          />
        </Link>

        <Menu />
      </header>
    </>
  )
}
