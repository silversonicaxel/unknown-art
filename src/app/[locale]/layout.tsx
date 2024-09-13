import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { dir } from 'i18next'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from 'src/components/analytics'
import { Header } from 'src/components/header'
import { font } from 'helpers/config/font'
import { locales, locales_codes } from 'helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'helpers/config/meta'
import { DialogProvider } from 'helpers/providers/dialog'
import { getTranslationServer } from 'helpers/utils/getTranslationServer'
import { isEnvironmentProduction } from 'helpers/utils/isEnvironment'
import type { ComponentParams } from 'types/component'
import { I18nLocale } from 'types/i18n'


type HomeLayoutProps = {
  children: ReactNode
} & ComponentParams

export async function generateMetadata({ params: { locale } }: HomeLayoutProps): Promise<Metadata> {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return {
    title: meta.siteName,
    description: t('description'),
    manifest: meta.siteManifest,
    icons: meta.siteIcons,
    openGraph: {
      title: meta.siteName,
      description: t('description'),
      url: META_SITE_BASE_URL,
      siteName: meta.siteName,
      locale: locales_codes[locale as I18nLocale],
      type: 'website',
    }
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function HomeLayout({ children, params: { locale } }: HomeLayoutProps) {
  const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'development'

  return (
    <html lang={locale} dir={dir(locale)}>
      <head />

      {isEnvironmentProduction(environment) && (<Analytics />)}

      <body className={font.className}>
        <DialogProvider />

        <main>
          <Header />

          {children}
        </main>
      </body>
    </html>
  )
}
