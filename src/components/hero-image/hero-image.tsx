'use client'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import type { I18nLocale } from 'types/i18n'
import styles from './hero-image.module.css'


export const HeroImage: FC = () => {
  const params = useParams()
  const locale = params.locale as I18nLocale
  const { t } = useTranslationClient({ locale, namespace: 'home' })

  return (
    <div className={styles.uaheroimage}>
      <Image
        src="/images/hero-image.png"
        role="presentation"
        alt={t('logo.title')}
        aria-label={t('logo.label')}
        fill
      />
    </div>
  )
}
