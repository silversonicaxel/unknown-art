import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { dir } from 'i18next'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { Header } from 'src/components/header'
import { font } from 'src/helpers/config/font'
import { locales } from 'src/helpers/config/i18n'
import { meta } from 'src/helpers/config/meta'
import { DialogProvider } from 'src/helpers/providers/dialog'
import type { ComponentParams } from 'src/types/component'


type AppLayoutProps = {
  children: ReactNode
} & ComponentParams

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: meta.siteName,
  description: meta.siteDescription,
  manifest: meta.siteManifest,
  icons: meta.siteIcons
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function AppLayout({ children, params: { locale } }: AppLayoutProps) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head />
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
