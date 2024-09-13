'use client'

import { useParams } from 'next/navigation'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { I18nLocale } from 'types/i18n'


export const NotFoundContentClient = () => {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <>
      <h1>{t('title')}</h1>

      <p>{t('notfound.description')}</p>
    </>
  )
}
