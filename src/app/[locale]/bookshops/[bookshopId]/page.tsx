import fetchedMeta from 'fetch-meta-tags'
import type { fetchedMeta as FetchedMetadata } from 'fetch-meta-tags'
import { locales_codes } from 'helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'helpers/config/meta'
import { getTranslationServer } from 'helpers/utils/getTranslationServer'
import { isImageSecure } from 'helpers/utils/isImageSecure'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBookshop } from 'src/api/bookshop'
import { SafeImage } from 'src/components/safe-image'
import type { ComponentParams } from 'types/component'
import type { I18nLocale } from 'types/i18n'
import styles from './bookshop.module.css'


type BookshopPageProps = {
  params: {
    bookshopId: string
  }
} & ComponentParams

type BookshopMeta = FetchedMetadata | null

export async function generateMetadata(
  { params: { bookshopId, locale } }: BookshopPageProps
): Promise<Metadata | void> {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })
  const bookshop = await getBookshop(bookshopId)
  if (bookshop === null) {
    return
  }

  return {
    title: `${meta.siteName} _ ${t('menu.bookshop')} _ ${bookshop.name}`,
    openGraph: {
      title: `${meta.siteName} - ${t('menu.bookshops')}`,
      description: t('description'),
      url: `${META_SITE_BASE_URL}${locale}/bookshops/${bookshop.id}`,
      siteName: meta.siteName,
      locale: locales_codes[locale as I18nLocale],
      type: 'website',
    }
  }
}

export default async function BookshopPage(
  { params: { bookshopId, locale } }: BookshopPageProps
) {
  const { t } = await getTranslationServer({ locale, namespace: 'bookshops' })

  const bookshop = await getBookshop(bookshopId)
  if (bookshop === null) {
    notFound()
  }

  let bookshopMeta: BookshopMeta
  try {
    bookshopMeta = bookshop.site ? await fetchedMeta(bookshop.site) : null
  } catch {
    bookshopMeta = null
  }

  return (
    <>
      <h1>{bookshop.name}</h1>
      <article className={styles.uabookshop}>
        <section className={styles.uabookshop_section}>
          <h4>{t('form.address')}</h4>

          <a
            href={bookshop.address_url ? bookshop.address_url : `https://www.google.com/maps/place/${bookshop.address}`}
            target="_blank"
            rel="noreferrer"
          >
            {bookshop.address}
          </a>
        </section>

        {bookshop.site && (
          <section className={styles.uabookshop_section}>
            <h4>{t('form.website')}</h4>
            <a
              href={bookshop.site}
              target="_blank"
              rel="noreferrer"
            >
              {bookshop.site}
            </a>
          </section>
        )}

        {bookshopMeta?.image && (
          <section className={styles.uabookshop_section}>
            <h4>{t('form.description')}</h4>
            <p>{bookshopMeta.description}</p>
          </section>
        )}

        {bookshopMeta?.image && isImageSecure(bookshopMeta.image) && (
          <section className={styles.uabookshop_section}>
            <h4>{t('form.image')}</h4>
            <SafeImage
              src={bookshopMeta.image}
              alt={bookshop.name}
              aria-label={bookshop.name}
            />
          </section>
        )}
      </article>
    </>
  )
}
