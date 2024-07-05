'use client'

import type { FC } from 'react'
import { useTranslation } from 'react-i18next'


export const Intro: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('common_title')}</h1>

      <p>{t('home_description')}</p>
    </>
  )
}
