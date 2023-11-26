import '../src/styles/globals.css'
import type { Metadata } from 'next'

import type { Viewport } from 'next/dist/lib/metadata/types/extra-types'
import type { ReactNode } from 'react'
import { font } from '../src/config/font'
import { meta } from '../src/config/meta'
import { Header } from '../src/views/header'
import { Menu } from '../src/views/menu'

type RootLayoutProps = {
  children: ReactNode
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head />
      <body className={font.className}>
        <main>
          <Header />
          <Menu />

          {children}
        </main>
      </body>
    </html>
  )
}
