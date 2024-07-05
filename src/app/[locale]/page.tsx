import type { Metadata } from 'next/types'

import { getRandomQuote } from '../../api/quote'
import { HeroImage } from '../../views/hero-image'

import styles from './app.module.css'

import { useTranslationServer } from 'src/hooks/useTranslationServer'
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
