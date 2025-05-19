'use client'

import Script from 'next/script'
import { memo } from 'react'
import type { FC } from 'react'
import { ANALYTICS_GOOGLE_ID } from 'src/helpers/config/analytics'


export const Analytics: FC = memo(() => {
  return (
    <>
      <Script id="gtm" async src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`} strategy="afterInteractive" />
      <Script id="dl">
        {
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_GOOGLE_ID}');`
        }
      </Script>
    </>
  )
})

Analytics.displayName = 'Analytics'
