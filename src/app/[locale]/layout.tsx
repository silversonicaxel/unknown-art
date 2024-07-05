import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { dir } from 'i18next'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { locales } from '../../config/i18n'

import { font } from 'src/config/font'
import { meta } from 'src/config/meta'
import { DialogProvider } from 'src/providers/dialog'
import type { ComponentParams } from 'src/types/component'
import { Header } from 'src/views/header'


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
