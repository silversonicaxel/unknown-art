import fetchedMeta from 'fetch-meta-tags'
import type { fetchedMeta as FetchedMetadata } from 'fetch-meta-tags'

import { getPlace } from '../../../src/api/place'
import { SafeImage } from '../../../src/views/safe-image'

import styles from './place.module.css'


type PlacePageProps = {
  params: {
    placeId: string
  }
}

type PlaceMeta = FetchedMetadata | null

export default async function PlacePage({ params }: PlacePageProps) {
  const place = await getPlace(params.placeId)

  const placeMeta: PlaceMeta = place.site
    ? await fetchedMeta(place.site || '')
    : null

  return (
    <>
      <h1>{place.name}</h1>
      <article className={styles.uaplace}>
        <a
          href={`https://www.google.com/maps/place/${place.address}`}
          target="_blank"
          rel="noreferrer"
        >
          {place.address}
        </a>
        {place.site && (
          <>
            <br />
            <a href={place.site} target="_blank" rel="noreferrer">
              {place.site}
            </a>
          </>
        )}

        {placeMeta && (
          <div className={styles.uaplace_data}>
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
