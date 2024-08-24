
import { getRandomQuote } from 'api/quote'
import { getTranslationServer } from 'helpers/utils/getTranslationServer'
import { HeroImage } from 'src/components/hero-image'
import type { ComponentParams } from 'types/component'
import styles from './home.module.css'


export const dynamic = 'force-dynamic'

type HomePageProps = ComponentParams

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const { t: tCommon } = await getTranslationServer({ locale, namespace: 'common' })
  const { t: tHome } = await getTranslationServer({ locale, namespace: 'home' })

  const quote = await getRandomQuote()

  return (
    <>
      <h1>{tCommon('title')}</h1>

      <p>{tHome('intro')}</p>

      <p>{tCommon('description')}</p>

      <p>{tHome('content')}</p>

      <HeroImage />

      <blockquote className={styles.uahome__quote}>
        <q>{quote.message}</q>
        <footer>{quote.author}</footer>
      </blockquote>
    </>
  )
}
