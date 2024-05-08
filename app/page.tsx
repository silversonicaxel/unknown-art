import { getRandomQuote } from '../src/api/quote'
import { HeroImage } from '../src/views/hero-image'

import styles from './app.module.css'


export const dynamic = 'force-dynamic'

export default async function AppPage() {
  const quote = await getRandomQuote()

  return (
    <>
      <h1>unknown art</h1>

      <p>
        unknown art is where you can, hopefully, get in contact with persons,
        lovers, thinkers, minds or artists, all over the beautiful world.
      </p>

      <HeroImage />

      <blockquote className={styles.uaapp_quote}>
        <q>{quote.message}</q>
        <footer>{quote.author}</footer>
      </blockquote>
    </>
  )
}
