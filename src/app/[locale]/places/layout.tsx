import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { locales_codes } from 'src/helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'src/helpers/config/meta'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'
import type { ComponentParams } from 'src/types/component'
import { I18nLocale } from 'src/types/i18n'


type PlacesLayoutProps = {
  children: ReactNode
} & ComponentParams


export async function generateMetadata(
  { params: { locale } }: PlacesLayoutProps
): Promise<Metadata> {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return {
    title: `${meta.siteName} - ${t('menu.places')}`,
    openGraph: {
      title: `${meta.siteName} - ${t('menu.places')}`,
      description: t('description'),
      url: `${META_SITE_BASE_URL}${locale}/places`,
      siteName: meta.siteName,
      locale: locales_codes[locale as I18nLocale],
      type: 'website',
    }
  }
}

export default async function PlacesLayout({ children, params: { locale } }: PlacesLayoutProps) {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return (
    <>
      <h5>{t('menu.places')}</h5>

      {children}
    </>
  )
}
