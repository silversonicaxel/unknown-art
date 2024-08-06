import type { Metadata } from 'next/types'

import styles from './app.module.css'

import { getRandomQuote } from 'src/api/quote'
import { HeroImage } from 'src/components/hero-image'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'
import type { ComponentParams } from 'src/types/component'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'unknown art',
}

type AppPageProps = ComponentParams

export default async function AppPage({ params: { locale } }: AppPageProps) {
  const { t: tCommon } = await getTranslationServer({ locale, namespace: 'common' })
  const { t: tHome } = await getTranslationServer({ locale, namespace: 'home' })

  const quote = await getRandomQuote()

  return (
    <>
      <h1>{tCommon('title')}</h1>

      <p>{tHome('description')}</p>

      <HeroImage />

      <blockquote className={styles.uaapp_quote}>
        <q>{quote.message}</q>
        <footer>{quote.author}</footer>
      </blockquote>
    </>
  )
}
