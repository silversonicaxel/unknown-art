'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

import styles from './menu.module.css'

import { locales } from 'src/helpers/config/i18n'
import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'


export const Menu: FC = memo(() => {
  const params = useParams()
  const { t } = useTranslationClient({
    locale: params.locale as string,
    namespace: 'translation'
  })

  return (
    <nav className={styles.uamenu} aria-label="unknown art menu">
      <ul className={styles.uamenu__sections} role="menubar" aria-label="menu">
        <li role="none">
          <Link href="/" role="menuitem" aria-label={`page ${t('common_menu.home')}`}>
            {t('common_menu.home')}
          </Link>
        </li>
        <li role="none">
          <Link href="/places" role="menuitem" aria-label={`page ${t('common_menu.places')}`}>
            {t('common_menu.places')}
          </Link>
        </li>
      </ul>
      <ul className={styles.uamenu__locales} role="menubar" aria-label="language navigation">
        {locales.map((loc) => {
          return (
            <li role="none" key={loc}>
              <Link href={`/${loc}`} lang={loc} role="menuitem" aria-label="language">
                {loc}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
})

Menu.displayName = 'Menu'
