import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { meta } from 'src/helpers/config/meta'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'
import type { ComponentParams } from 'src/types/component'


type PlacesLayoutProps = {
  children: ReactNode
} & ComponentParams


export async function generateMetadata(
  { params: { locale } }: PlacesLayoutProps
): Promise<Metadata> {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return {
    title: `${meta.siteName} - ${t('menu.places')}`
  }
}

export default async function PlacesLayout({ children, params: { locale } }: PlacesLayoutProps) {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })

  return (
    <>
      <h5>{t('menu.places')}</h5>

      {children}
    </>
  )
}
