'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

import styles from './header.module.css'

import { Menu } from 'src/components/menu'
import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { I18nLocale } from 'types/i18n'


export const Header: FC = () => {
  const params = useParams()
  const locale = params.locale as I18nLocale
  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <header className={styles.uaheader}>
      <Link href={`/${locale}/`}>
        <Image
          src="/images/logo.png"
          alt={t('logo.title')}
          width={80}
          height={80}
          className={styles.uaheader_logo}
          role="navigation"
          aria-label={t('logo.label')}
        />
      </Link>

      <Menu />
    </header>
  )
}
