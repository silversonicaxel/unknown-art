import Link from 'next/link'
import { getCountryCodes } from '../../src/api/country'
import { getPlacesData } from '../../src/api/place'
import styles from './places.module.css'

export default async function PlacesPage() {
  const countryCodes = await getCountryCodes()
  const places = await getPlacesData()

  return places.map((place, idx) => (
    <div key={`place-${idx}`} className={styles.uaplaces}>
      <Link href={`places/${place.id}`}>
        {place.name} - {countryCodes[place.iso]}
      </Link>
    </div>
  ))
}
