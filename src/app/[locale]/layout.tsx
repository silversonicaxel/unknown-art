import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { dir } from 'i18next'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from 'src/components/analytics'
import { Header } from 'src/components/header'
import { font } from 'src/helpers/config/font'
import { locales, locales_codes } from 'src/helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'src/helpers/config/meta'
import { DialogProvider } from 'src/helpers/providers/dialog'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'
import type { ComponentParams } from 'src/types/component'


type AppLayoutProps = {
  children: ReactNode
} & ComponentParams

export async function generateMetadata({ params: { locale } }: AppLayoutProps): Promise<Metadata> {
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
      locale: locales_codes[locale],
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

export default function AppLayout({ children, params: { locale } }: AppLayoutProps) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head />

      <Analytics />

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
