'use client'

import { useParams } from 'next/navigation'
import type { Metadata } from 'next/types'
import { useCallback } from 'react'

import { ErrorContent } from 'src/components/error-content'
import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { ComponentErrorParams } from 'src/types/component'


type AppErrorProps = ComponentErrorParams

export const metadata: Metadata = {
  title: 'unknown art',
}

export default function AppError({ reset }: AppErrorProps) {
  const params = useParams()
  const locale = params.locale as string

  const { t } = useTranslationClient({ locale, namespace: 'common' })
  const tPage = t('menu.home')

  const onReset = useCallback(() => {
    reset()
  }, [reset])

  return (<ErrorContent page={tPage} onReset={onReset} />)
}
