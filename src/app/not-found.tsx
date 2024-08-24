import { font } from 'helpers/config/font'
import { isEnvironmentProduction } from 'helpers/utils/isEnvironment'
import type { Metadata } from 'next/types'
import { Analytics } from 'src/components/analytics'
import { NotFoundContentServer } from 'src/components/not-found-content'


export const metadata: Metadata = {
  title: 'unknown art',
}

export default function AppNotFound() {
  const environment = process.env.NEXT_PUBLIC_NODE_ENV ?? 'development'

  return (
    <html>
      <head />

      {isEnvironmentProduction(environment) && (<Analytics />)}

      <body className={font.className}>
        <main>
          <NotFoundContentServer />
        </main>
      </body>
    </html>
  )
}
