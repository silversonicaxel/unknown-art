'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

import styles from './menu.module.css'

import { locales } from 'helpers/config/i18n'
import { useLocalesCurrentUrl } from 'helpers/hooks/useLocalesCurrentUrl'
import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import type { I18nLocale } from 'types/i18n'


export const Menu: FC = memo(() => {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { urls } = useLocalesCurrentUrl({ currentLocale: locale })

  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <nav className={styles.uamenu} aria-label="unknown art menu">
      <ul className={styles.uamenu__sections} role="menubar" aria-label="menu">
        <li role="none">
          <Link href={`/${locale}/`} role="menuitem" aria-label={`page ${t('menu.home')}`}>
            {t('menu.home')}
          </Link>
        </li>
        <li role="none">
          <Link
            href={`/${locale}/bookshops`}
            role="menuitem"
            aria-label={`page ${t('menu.bookshops')}`}
          >
            {t('menu.bookshops')}
          </Link>
        </li>
      </ul>
      <ul className={styles.uamenu__locales} role="menubar" aria-label="language navigation">
        {locales.map((loc) => {
          return (
            <li role="none" key={loc}>
              <Link href={urls[loc]} lang={loc} role="menuitem" aria-label="language">
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
