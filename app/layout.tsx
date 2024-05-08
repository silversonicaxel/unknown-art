import 'src/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { font } from 'src/config/font'
import { meta } from 'src/config/meta'
import { Header } from 'src/views/header'


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
    <html lang="en">
      <head />
      <body className={font.className}>
        <main>
          <Header />

          {children}
        </main>
      </body>
    </html>
  )
}
