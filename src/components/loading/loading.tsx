'use client'

import { useParams } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import type { I18nLocale } from 'types/i18n'


type LoadingProps = {
  text: string
}

export const Loading: FC<LoadingProps> = memo(({ text }) => {
  const params = useParams()
  const locale = params.locale as I18nLocale
  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return <>{`${t('loading')} "${text}" ...`}</>
})

Loading.displayName = 'Loading'
