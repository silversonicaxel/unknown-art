
import styles from './bookshops.module.css'

import { getBookshopsCountryCodesList } from 'api/country'
import { PAGINATION_LIMIT } from 'helpers/config/pagination'
import { getBookshopsList, getTotalBookshops } from 'src/api/bookshop'
import { SearchArea } from 'src/components/search-area'
import { SearchResults } from 'src/components/search-results'
import { ApiQuery } from 'types/api'
import { ComponentParams } from 'types/component'


export const dynamic = 'force-dynamic'

type BookshopsPageProps = {
  searchParams?: {
    query?: string
    page?: string
  }
} & ComponentParams

export default async function BookshopsPage(props: BookshopsPageProps) {
  const search = props?.searchParams?.query || undefined

  const currentPage = Number(props?.searchParams?.page) || 1
  const bookshopsListApiQuery: ApiQuery = {
    limit: PAGINATION_LIMIT,
    offset: currentPage - 1,
    search
  }

  const [countryCodes, bookshops, totalBookshops] = await Promise.all([
    getBookshopsCountryCodesList(),
    getBookshopsList(bookshopsListApiQuery),
    getTotalBookshops(bookshopsListApiQuery)
  ])

  return (
    <section className={styles.uabookshops}>
      <SearchArea countries={countryCodes} totalBookshops={totalBookshops} />

      <SearchResults
        countryCodes={countryCodes}
        bookshops={bookshops}
        totalBookshops={totalBookshops}
      />
    </section>
  )
}
