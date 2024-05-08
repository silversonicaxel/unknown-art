import Link from 'next/link'

import { getCountryCodes } from '../../src/api/country'
import { getPlacesList } from '../../src/api/place'

import styles from './places.module.css'


export const dynamic = 'force-dynamic'

export default async function PlacesPage() {
  const [countryCodes, places] = await Promise.all([
    getCountryCodes(),
    getPlacesList()
  ])

  return places.map((place) => (
    <div key={`place-${place.id}`} className={styles.uaplaces}>
      <Link href={`places/${place.id}`}>
        <span>{place.name}</span>
        &nbsp;
        <span>~</span>
        &nbsp;
        <span>
          {place.city ? `${place.city} - ` : ``}
          {countryCodes[place.iso]}
        </span>
      </Link>
    </div>
  ))
}
