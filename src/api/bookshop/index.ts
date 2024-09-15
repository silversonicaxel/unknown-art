import { clientPromise } from 'helpers/config/mongodb'
import type { Bookshop } from 'src/types/bookshop'
import type { ApiQuery } from 'types/api'
import type { SearchBookshopsApi } from 'types/search'


const getFindParamsFilter = (search: string) => {
  const searchData = JSON.parse(search)

  const searchFilter: SearchBookshopsApi = {}
  if (searchData.name) {
    searchFilter.name = { $regex: searchData.name, $options: 'si' }
  }
  if (searchData.iso) {
    searchFilter.iso = searchData.iso
  }
  if (searchData.city) {
    searchFilter.city = { $regex: searchData.city, $options: 'si' }
  }
  if (searchData.website === 'with') {
    searchFilter.site = { $exists: true }
  } else if (searchData.website === 'without') {
    searchFilter.site = { $exists: false }
  }

  return searchFilter
}

const getFindParams = (query: ApiQuery = {}) => {
  const { search, ...options } = query

  const findFilter = search ? getFindParamsFilter(search) : {}
  const findOptions = {
    limit: options.limit,
    skip: (options.offset ?? 0) * (options.limit ?? 0)
  }

  return { findFilter, findOptions }
}

export const getBookshopsList = async (query: ApiQuery = {}): Promise<Bookshop[]> => {
  const { findFilter, findOptions } = getFindParams(query)

  const mongoClient = await clientPromise
  const bookshops = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find(findFilter, findOptions)
    .collation({ locale: 'en' })
    .sort({ name: 1 })
    .toArray()

  return JSON.parse(JSON.stringify(bookshops))
}

export const getBookshop = async (id: string): Promise<Bookshop> => {
  const mongoClient = await clientPromise
  const bookshop = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .findOne({ id })

  return JSON.parse(JSON.stringify(bookshop))
}

export const getTotalBookshops = async (query: ApiQuery = {}): Promise<number> => {
  const { findFilter } = getFindParams(query)

  const mongoClient = await clientPromise
  const bookshops = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find(findFilter)
    .collation({ locale: 'en' })
    .toArray()

  return bookshops.length
}
