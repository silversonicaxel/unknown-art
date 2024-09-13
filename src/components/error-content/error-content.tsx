'use client'

import { useParams } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { ComponentErrorParams } from 'types/component'
import { I18nLocale } from 'types/i18n'


type ErrorContentProps = {
  page: string
  onReset: ComponentErrorParams['reset']
}

export const ErrorContent: FC<ErrorContentProps> = memo(({ page, onReset }) => {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <>
      <h1>{t('title')}</h1>

      <p>{t('error.description', { page })}</p>

      <a
        role="button"
        aria-label={t('error.action.reload.label', { page })}
        onClick={onReset}
      >
        {t('error.action.reload.title')}
      </a>
    </>
  )
})

ErrorContent.displayName = 'ErrorContent'
