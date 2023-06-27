//import { server } from '../../server/config'
import type { DbPlace, DbPlaceCountries } from '../../../server/api/types'
import Link from 'next/link'
import styles from './places.module.css'
import { Suspense } from 'react'
import { Loading } from '../../../views/loading'
import type { FC } from 'react'

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
