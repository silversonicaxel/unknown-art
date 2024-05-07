import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { FC } from 'react'
import styles from './header.module.css'
import { Menu } from 'src/views/menu'
import { Meta } from 'src/views/meta'

export const Header: FC = () => {
  return (
    <>
      <Meta />

      <header className={styles.uaheader}>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='logo unknown art'
            width={80}
            height={80}
            className={styles.uaheader_logo}
            role='navigation'
            aria-label='main logo'
          />
        </Link>

        <Menu />
      </header>
    </>
  )
}

Header.displayName = 'Header'
