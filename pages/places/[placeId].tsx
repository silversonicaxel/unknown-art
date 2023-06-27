import { memo } from 'react'
import type { Place } from '../../server/api/types'
import Header from '../../views/header'
//import { server } from '../../server/config'
import { getPlaceData } from '../api/places'
import { Suspense } from 'react'
import Loading from '../../views/loading/loading'
import * as FetchMeta from 'fetch-meta-tags'
import Image from 'next/image'
import styles from './place.module.css'

type PlaceProps = { place: Place; metas: any }

export const getServerSideProps = async (context: any) => {
  //const res = await fetch(`${server}api/place/${context.params.placeId}`)
  //const place = await res.json()

  const place = await getPlaceData(context.params.placeId)

  const metas = place.site ? await FetchMeta.default(place.site) : {}

  return {
    props: {
      place: place,
      metas: metas
    }
  }
}

const PlaceId = ({ place, metas }: PlaceProps) => (
  <Suspense fallback={<Loading text='place' />}>
    <Header title={place.name} />

    <h1>{place.name}</h1>
    <main className={styles.uaplace}>
      <a
        href={`https://www.google.com/maps/place/${place.address}`}
        target='_blank'
        rel='noreferrer'
      >
        {place.address}
      </a>
      {place.site && (
        <>
          <br />
          <a href={place.site} target='_blank' rel='noreferrer'>
            {place.site}
          </a>
        </>
      )}

      <Suspense fallback={<Loading text='info' />}>
        <div className={styles.uaplace_data}>
          {metas.description && <p>{metas.description}</p>}

          {metas.image && (
            <Image
              src={metas.image}
              loader={() => metas.image}
              alt={place.name}
              role='img'
              aria-label={place.name}
              fill
            />
          )}
        </div>
      </Suspense>
    </main>
  </Suspense>
)

export default memo(PlaceId)
