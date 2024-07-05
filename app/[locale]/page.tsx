import type { Metadata } from 'next/types'

import styles from './app.module.css'

import { getRandomQuote } from 'src/api/quote'
import { HeroImage } from 'src/views/app/hero-image'
import { Intro } from 'src/views/app/intro/intro'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'unknown art',
}

export default async function AppPage() {
  const quote = await getRandomQuote()

  return (
    <>
      <Intro />

      <HeroImage />

      <blockquote className={styles.uaapp_quote}>
        <q>{quote.message}</q>
        <footer>{quote.author}</footer>
      </blockquote>
    </>
  )
}
