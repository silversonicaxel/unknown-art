import fetchedMeta from 'fetch-meta-tags'
import type { fetchedMeta as FetchedMetadata } from 'fetch-meta-tags'
import type { Metadata } from 'next'

import styles from './place.module.css'

import { getPlace } from 'src/api/place'
import { useTranslationServer } from 'src/hooks/useTranslationServer'
import type { ComponentParams } from 'src/types/component'
import { SafeImage } from 'src/views/safe-image'


type PlacePageProps = {
  params: {
    placeId: string
  }
} & ComponentParams

type PlaceMeta = FetchedMetadata | null

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const place = await getPlace(params.placeId)

  return {
    title: `unknown art _ place _ ${place.name}`,
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { t } = await useTranslationServer({ locale: params.locale, namespace: 'translation' })

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
          <h4>{t('places_file.address')}</h4>
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
            <h4>{t('places_file.website')}</h4>
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
            <h4>{t('places_file.description')}</h4>
            <p>{placeMeta.description}</p>
          </section>
        )}

        {placeMeta?.image && (
          <section className={styles.uaplace_section}>
            <h4>{t('places_file.image')}</h4>
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
