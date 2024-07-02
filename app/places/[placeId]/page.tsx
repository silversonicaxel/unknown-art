import fetchedMeta from 'fetch-meta-tags'
import type { fetchedMeta as FetchedMetadata } from 'fetch-meta-tags'
import type { Metadata } from 'next'

import styles from './place.module.css'

import { getPlace } from 'src/api/place'
import { SafeImage } from 'src/views/safe-image'


type PlacePageProps = {
  params: {
    placeId: string
  }
}

type PlaceMeta = FetchedMetadata | null

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const place = await getPlace(params.placeId)

  return {
    title: `unknown art _ place _ ${place.name}`,
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
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
        <a
          className={styles.uaplace_info}
          href={`https://www.google.com/maps/place/${place.address}`}
          target="_blank"
          rel="noreferrer"
        >
          {place.address}
        </a>
        {place.site && (
          <a
            className={styles.uaplace_info}
            href={place.site}
            target="_blank"
            rel="noreferrer"
          >
            {place.site}
          </a>
        )}

        {placeMeta && (
          <div className={styles.uaplace_meta}>
            <p>{placeMeta.description}</p>

            {placeMeta.image && (
              <SafeImage
                src={placeMeta.image}
                alt={place.name}
                aria-label={place.name}
              />
            )}
          </div>
        )}
      </article>
    </>
  )
}
