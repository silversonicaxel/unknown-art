import Link from 'next/link'
import { getCountryCodes } from '../../src/api/country'
import { getPlacesData } from '../../src/api/place'
import styles from './places.module.css'

export const dynamic = 'force-dynamic'

export default async function PlacesPage() {
  const [countryCodes, places] = await Promise.all([
    getCountryCodes(),
    getPlacesData()
  ])

  return places.map((place, idx) => (
    <div key={`place-${idx}`} className={styles.uaplaces}>
      <Link href={`places/${place.id}`}>
        {place.name} - {countryCodes[place.iso]}
      </Link>
    </div>
  ))
}
