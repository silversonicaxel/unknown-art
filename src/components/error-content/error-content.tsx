'use client'

import { useParams } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { ComponentErrorParams } from 'src/types/component'


type ErrorContentProps = {
  page: string
  onReset: ComponentErrorParams['reset']
}

export const ErrorContent: FC<ErrorContentProps> = memo(({ page, onReset }) => {
  const params = useParams()
  const locale = params.locale as string

  const { t } = useTranslationClient({ locale, namespace: 'translation' })

  return (
    <>
      <h1>{t('common_title')}</h1>

      <p>{t('common_error.description', { page })}</p>

      <a
        role="button"
        aria-label={t('common_error.action.reload.label', { page })}
        onClick={onReset}
      >
        {t('common_error.action.reload.title')}
      </a>
    </>
  )
})

ErrorContent.displayName = 'ErrorContent'
