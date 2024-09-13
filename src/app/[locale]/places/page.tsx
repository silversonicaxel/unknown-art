import styles from './places.module.css'

import { getPlacesCountryCodesList } from 'api/country'
import { getPlacesList, getTotalPlaces } from 'api/place'
import { SearchArea } from 'src/components/search-area'
import { SearchResults } from 'src/components/search-results'
import { PAGINATION_LIMIT } from 'helpers/config/pagination'
import { ApiQuery } from 'types/api'
import { ComponentParams } from 'types/component'


export const dynamic = 'force-dynamic'

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
    getPlacesCountryCodesList(),
    getPlacesList(placesListApiQuery),
    getTotalPlaces(placesListApiQuery)
  ])

  return (
    <section className={styles.uaplaces}>
      <SearchArea countries={countryCodes} totalPlaces={totalPlaces} />

      <SearchResults countryCodes={countryCodes} places={places} totalPlaces={totalPlaces}/>
    </section>
  )
}
