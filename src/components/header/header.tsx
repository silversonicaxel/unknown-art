'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

import styles from './header.module.css'

import { Menu } from 'src/components/menu'
import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'


export const Header: FC = () => {
  const params = useParams()
  const locale = params.locale as string
  const { t } = useTranslationClient({
    locale,
    namespace: 'translation'
  })

  return (
    <header className={styles.uaheader}>
      <Link href={`/${locale}/`}>
        <Image
          src="/images/logo.png"
          alt={t('common_logo.title')}
          width={80}
          height={80}
          className={styles.uaheader_logo}
          role="navigation"
          aria-label={t('common_logo.label')}
        />
      </Link>

      <Menu />
    </header>
  )
}
