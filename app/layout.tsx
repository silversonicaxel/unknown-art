import 'src/styles/globals.css'
import 'src/styles/reset.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { font } from 'src/config/font'
import { meta } from 'src/config/meta'
import { DialogProvider } from 'src/providers/dialog'
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
        <DialogProvider />

        <main>
          <Header />

          {children}
        </main>
      </body>
    </html>
  )
}
