import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { meta } from 'src/config/meta'


type PlacesLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: `${meta.siteName} - places`,
  description: meta.siteDescription
}

export default async function PlacesLayout({ children }: PlacesLayoutProps) {
  return (
    <>
      <h5>places</h5>

      {children}
    </>
  )
}
