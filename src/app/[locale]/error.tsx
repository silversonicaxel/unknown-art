'use client'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import { useParams } from 'next/navigation'
import type { Metadata } from 'next/types'
import { useCallback } from 'react'
import { ErrorContent } from 'src/components/error-content'
import type { ComponentErrorParams } from 'types/component'
import type { I18nLocale } from 'types/i18n'


type HomeErrorProps = ComponentErrorParams

export const metadata: Metadata = {
  title: 'unknown art',
}

export default function HomeError({ reset }: HomeErrorProps) {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'common' })
  const tPage = t('menu.home')

  const onReset = useCallback(() => {
    reset()
  }, [reset])

  return (<ErrorContent page={tPage} onReset={onReset} />)
}
