'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

import styles from './hero-image.module.css'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'


export const HeroImage: FC = () => {
  const params = useParams()
  const locale = params.locale as string
  const { t } = useTranslationClient({ locale, namespace: 'home' })

  return (
    <div className={styles.uaheroimage}>
      <Image
        src="/images/hero-image.png"
        alt={t('logo.title')}
        role="presentation"
        aria-label={t('logo.label')}
        fill
      />
    </div>
  )
}
