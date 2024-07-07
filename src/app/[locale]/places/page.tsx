import Link from 'next/link'
import type { Metadata } from 'next/types'

import styles from './places.module.css'

import { getCountryCodes } from 'src/api/country'
import { getPlacesList, getTotalPlaces } from 'src/api/place'
import { Pagination } from 'src/components/pagination'
import { SearchPlacesBox } from 'src/components/search-places-box'
import { PAGINATION_LIMIT } from 'src/helpers/config/pagination'
import { ApiQuery } from 'src/types/api'
import { ComponentParams } from 'src/types/component'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'unknown art _ places',
}

type PlacePageProps = {
  searchParams?: {
    query?: string
    page?: string
  }
} & ComponentParams

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
        <div key={`place-${place.id}`} className={styles.uaplaces__item}>
          <Link href={`/${props.params.locale}/places/${place.id}`}>
            <span>{place.name}</span>
            &nbsp;
            <span className={styles['uaplaces__item-separator']}>~~</span>
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
