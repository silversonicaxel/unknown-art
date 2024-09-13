import { clientPromise } from 'src/helpers/config/mongodb'
import type { ApiQuery } from 'types/api'
import type { Place } from 'types/place'
import type { SearchPlacesApi } from 'types/search'


const getFindParamsFilter = (search: string) => {
  const searchData = JSON.parse(search)

  const searchFilter: SearchPlacesApi = {}
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

export const getPlacesList = async (query: ApiQuery = {}): Promise<Place[]> => {
  const { findFilter, findOptions } = getFindParams(query)

  const mongoClient = await clientPromise
  const places = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find(findFilter, findOptions)
    .collation({ locale: 'en' })
    .sort({ name: 1 })
    .toArray()

  return JSON.parse(JSON.stringify(places))
}

export const getPlace = async (id: string): Promise<Place> => {
  const mongoClient = await clientPromise
  const place = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .findOne({ id })

  return JSON.parse(JSON.stringify(place))
}

export const getTotalPlaces = async (query: ApiQuery = {}): Promise<number> => {
  const { findFilter } = getFindParams(query)

  const mongoClient = await clientPromise
  const places = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find(findFilter)
    .collation({ locale: 'en' })
    .toArray()

  return places.length
}
