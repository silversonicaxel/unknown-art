'use client'

import { useParams } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

import { useTranslationClient } from 'src/hooks/useTranslationClient'


type LoadingProps = {
  text: string
}

export const Loading: FC<LoadingProps> = memo(({ text }) => {
  const params = useParams()
  const { t } = useTranslationClient({
    locale: params.locale as string,
    namespace: 'translation'
  })

  return <>{`${t('common_loading')} "${text}" ...`}</>
})

Loading.displayName = 'Loading'
