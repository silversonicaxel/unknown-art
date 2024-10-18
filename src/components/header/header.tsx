'use client'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { Menu } from 'src/components/menu'
import type { I18nLocale } from 'types/i18n'
import styles from './header.module.css'


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
