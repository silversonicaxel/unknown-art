import fetchedMeta from 'fetch-meta-tags'
import type { fetchedMeta as FetchedMetadata } from 'fetch-meta-tags'
import type { Metadata } from 'next'

import styles from './place.module.css'

import { getPlace } from 'src/api/place'
import { SafeImage } from 'src/components/safe-image'
import { locales_codes } from 'src/helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'src/helpers/config/meta'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'
import { isImageSecure } from 'src/helpers/utils/isImageSecure'
import type { ComponentParams } from 'src/types/component'


type PlacePageProps = {
  params: {
    placeId: string
  }
} & ComponentParams

type PlaceMeta = FetchedMetadata | null

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { t } = await getTranslationServer({ locale: params.locale, namespace: 'common' })
  const place = await getPlace(params.placeId)

  return {
    title: `${meta.siteName} _ ${t('menu.place')} _ ${place.name}`,
    openGraph: {
      title: `${meta.siteName} - ${t('menu.places')}`,
      description: t('description'),
      url: `${META_SITE_BASE_URL}${params.locale}/places/${place.id}`,
      siteName: meta.siteName,
      locale: locales_codes[params.locale],
      type: 'website',
    }
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { t } = await getTranslationServer({ locale: params.locale, namespace: 'places' })

  const place = await getPlace(params.placeId)

  let placeMeta: PlaceMeta
  try {
    placeMeta = place.site ? await fetchedMeta(place.site) : null
  } catch {
    placeMeta = null
  }

  return (
    <>
      <h1>{place.name}</h1>
      <article className={styles.uaplace}>
        <section className={styles.uaplace_section}>
          <h4>{t('form.address')}</h4>
          <a
            href={`https://www.google.com/maps/place/${place.address}`}
            target="_blank"
            rel="noreferrer"
          >
            {place.address}
          </a>
        </section>

        {place.site && (
          <section className={styles.uaplace_section}>
            <h4>{t('form.website')}</h4>
            <a
              href={place.site}
              target="_blank"
              rel="noreferrer"
            >
              {place.site}
            </a>
          </section>
        )}

        {placeMeta?.image && (
          <section className={styles.uaplace_section}>
            <h4>{t('form.description')}</h4>
            <p>{placeMeta.description}</p>
          </section>
        )}

        {placeMeta?.image && isImageSecure(placeMeta.image) && (
          <section className={styles.uaplace_section}>
            <h4>{t('form.image')}</h4>
            <SafeImage
              src={placeMeta.image}
              alt={place.name}
              aria-label={place.name}
            />
          </section>
        )}
      </article>
    </>
  )
}
