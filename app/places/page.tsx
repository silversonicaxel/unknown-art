import Link from 'next/link'

import styles from './places.module.css'

import { getCountryCodes } from 'src/api/country'
import { getPlacesList, getTotalPlaces } from 'src/api/place'
import { PAGINATION_LIMIT } from 'src/config/pagination'
import { ApiQuery } from 'src/types/api'
import { Pagination } from 'src/views/pagination'
import { SearchPlacesBox } from 'src/views/search-places-box'


export const dynamic = 'force-dynamic'

type PlacePageProps = {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default async function PlacesPage(props: PlacePageProps) {
  const search = props?.searchParams?.query || undefined

  const currentPage = Number(props?.searchParams?.page) || 1
  const placesListApiQuery: ApiQuery = {
    limit: PAGINATION_LIMIT,
    offset: currentPage - 1,
    search
  }

  const [countryCodes, places, totalPlaces] = await Promise.all([
    getCountryCodes(),
    getPlacesList(placesListApiQuery),
    getTotalPlaces(placesListApiQuery)
  ])

  return (
    <>
      <SearchPlacesBox countries={countryCodes}/>

      {places.map((place) => (
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
      ))}

      <Pagination totalItems={totalPlaces} />
    </>
  )
}
