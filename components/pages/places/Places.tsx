//import { server } from '../../server/config'
import Link from 'next/link'
import { Suspense } from 'react'
import type { FC } from 'react'
import type { DbPlace, DbPlaceCountries } from '../../../server/api/types'
import { Loading } from '../../../views/loading'
import styles from './places.module.css'

type PlacesProps = {
  places: DbPlace[]
  countryCodes: DbPlaceCountries
}

export const Places: FC<PlacesProps> = ({ places, countryCodes }) => {
  return (
    <Suspense fallback={<Loading text='places' />}>
      <h1>places</h1>
      {places.map((place, idx) => (
        <div key={`place-${idx}`} className={styles.uaplaces}>
          <Link href={`places/${place.id}`}>
            {place.name} - {countryCodes[place.iso]}
          </Link>
        </div>
      ))}
    </Suspense>
  )
}

Places.displayName = 'Places'
