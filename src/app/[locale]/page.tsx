import type { Metadata } from 'next/types'

import styles from './app.module.css'

import { getRandomQuote } from 'src/api/quote'
import { HeroImage } from 'src/components/hero-image'
import { useTranslationServer } from 'src/helpers/hooks/useTranslationServer'
import type { ComponentParams } from 'src/types/component'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'unknown art',
}

type AppPageProps = ComponentParams

export default async function AppPage({ params: { locale } }: AppPageProps) {
  const { t } = await useTranslationServer({ locale, namespace: 'translation' })

  const quote = await getRandomQuote()

  return (
    <>
      <h1>{t('common_title')}</h1>

      <p>{t('home_description')}</p>

      <HeroImage />

      <blockquote className={styles.uaapp_quote}>
        <q>{quote.message}</q>
        <footer>{quote.author}</footer>
      </blockquote>
    </>
  )
}
