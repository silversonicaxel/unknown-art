'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

import styles from './hero-image.module.css'

import { useTranslationClient } from 'src/hooks/useTranslationClient'


export const HeroImage: FC = () => {
  const params = useParams()
  const { t } = useTranslationClient({
    locale: params.locale as string,
    namespace: 'translation'
  })

  return (
    <div className={styles.uaheroimage}>
      <Image
        src="/images/hero-image.png"
        alt={t('home_logo.title')}
        role="presentation"
        aria-label={t('home_logo.label')}
        fill
      />
    </div>
  )
}
