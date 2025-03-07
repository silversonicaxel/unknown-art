'use client'

import Script from 'next/script'
import { memo } from 'react'
import type { FC } from 'react'


export const Analytics: FC = memo(() => {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ED84KW8XBQ" strategy="afterInteractive" />
      <Script id="analytics">
        {
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ED84KW8XBQ');`
        }
      </Script>
    </>
  )
})

Analytics.displayName = 'Analytics'
