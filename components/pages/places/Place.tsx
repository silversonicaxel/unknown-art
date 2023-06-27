import { memo } from 'react'
import type { DbPlace } from '../../../server/api/types'
import { Header } from '../../../views/header'
//import { server } from '../../server/config'
import { Suspense } from 'react'
import { Loading } from '../../../views/loading'
import styles from './place.module.css'
import { SafeImage } from '../../../views/safe-image'
import type { FC } from 'react'

type PlaceProps = {
  place: DbPlace
  metas: any
}

export const Place: FC<PlaceProps> = memo(({ place, metas }) => (
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
            <SafeImage
              src={metas.image}
              loader={() => metas.image}
              alt={place.name}
              aria-label={place.name}
              fill
            />
          )}
        </div>
      </Suspense>
    </main>
  </Suspense>
))

Place.displayName = 'Place'
