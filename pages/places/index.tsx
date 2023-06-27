//import { server } from '../../server/config'
import type { Place, PlaceCountries } from '../../server/api/types'
import Link from 'next/link'
import { getPlacesData } from '../api/places'
import styles from './places.module.css'
import { Suspense } from 'react'
import { Loading } from '../../views/loading'
import type { FC } from 'react'

type PlacesProps = {
  places: Place[]
  countryCodes: PlaceCountries
}

const Places: FC<PlacesProps> = ({ places, countryCodes }) => {
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

export const getServerSideProps = async (context: any) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  //const res = await fetch(`${server}api/places`)
  //const places = await res.json()
  const countryCodesResponse = await fetch('http://country.io/names.json', {
    mode: 'no-cors'
  })
  const countryCodes = await countryCodesResponse.json()

  const places = await getPlacesData()

  return {
    props: {
      places: places,
      countryCodes: countryCodes
    }
  }
}

export default Places
