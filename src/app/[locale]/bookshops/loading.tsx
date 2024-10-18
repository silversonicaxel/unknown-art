'use client'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import { useParams } from 'next/navigation'
import { Loading } from 'src/components/loading'
import type { I18nLocale } from 'types/i18n'


export default function BookshopsLoading() {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return <Loading text={t('menu.bookshops')} />
}
