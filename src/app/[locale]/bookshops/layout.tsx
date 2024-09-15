import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { locales_codes } from 'helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'helpers/config/meta'
import { getTranslationServer } from 'helpers/utils/getTranslationServer'
import type { ComponentParams } from 'types/component'
import { I18nLocale } from 'types/i18n'


type BookshopsLayoutProps = {
  children: ReactNode
} & ComponentParams


export async function generateMetadata(
  { params: { locale } }: BookshopsLayoutProps
): Promise<Metadata> {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return {
    title: `${meta.siteName} - ${t('menu.bookshops')}`,
    openGraph: {
      title: `${meta.siteName} - ${t('menu.bookshops')}`,
      description: t('description'),
      url: `${META_SITE_BASE_URL}${locale}/bookshops`,
      siteName: meta.siteName,
      locale: locales_codes[locale as I18nLocale],
      type: 'website',
    }
  }
}

export default async function BookshopsLayout(
  { children, params: { locale } }: BookshopsLayoutProps
) {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return (
    <>
      <h5>{t('menu.bookshops')}</h5>

      {children}
    </>
  )
}
