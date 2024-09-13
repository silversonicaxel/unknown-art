'use client'

import { useParams } from 'next/navigation'
import type { Metadata } from 'next/types'
import { useCallback } from 'react'

import { ErrorContent } from 'src/components/error-content'
import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { ComponentErrorParams } from 'types/component'
import { I18nLocale } from 'types/i18n'


type PlacesErrorProps = ComponentErrorParams

export const metadata: Metadata = {
  title: 'unknown art',
}

export default function PlacesError({ reset }: PlacesErrorProps) {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'common' })
  const tPage = t('menu.places')

  const onReset = useCallback(() => {
    reset()
  }, [reset])

  return (<ErrorContent page={tPage} onReset={onReset} />)
}
