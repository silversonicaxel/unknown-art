import 'src/styles/globals.css'
import 'src/styles/reset.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import type { TranslationProviderProps } from '../src/providers/translation'

import i18nConfig from './i18nConfig'

import { font } from 'src/config/font'
import { meta } from 'src/config/meta'
import { DialogProvider } from 'src/providers/dialog'
import { Header } from 'src/views/header'


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

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

type RootLayoutProps = {
  children: ReactNode,
  params: {
    locale: TranslationProviderProps['locale']
  }
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  return (
    <html lang={locale}>
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
