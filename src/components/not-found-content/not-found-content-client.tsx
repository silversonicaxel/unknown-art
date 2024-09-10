'use client'

import { useParams } from 'next/navigation'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'


export const NotFoundContentClient = () => {
  const params = useParams()
  const locale = params.locale as string

  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <>
      <h1>{t('title')}</h1>

      <p>{t('notfound.description')}</p>
    </>
  )
}
