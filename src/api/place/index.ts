import { clientPromise } from 'src/config/mongodb'
import type { ApiQuery } from 'src/types/api'
import type { Place } from 'src/types/place'
import type { SearchPlacesApi } from 'src/types/search'


const getFindParamsFilter = (search: string) => {
  const searchData = JSON.parse(search)

  const searchFilter: SearchPlacesApi = {}
  if (searchData.name) {
    searchFilter.name = { $regex: searchData.name, $options: 'si' }
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
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find(findFilter, findOptions)
    .collation({ locale: 'en' })
    .sort({ name: 1 })
    .toArray()

  return JSON.parse(JSON.stringify(data))
}

export const getPlace = async (id: string): Promise<Place> => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .findOne({ id })

  return JSON.parse(JSON.stringify(data))
}

export const getTotalPlaces = async (query: ApiQuery = {}): Promise<number> => {
  const { findFilter } = getFindParams(query)

  const mongoClient = await clientPromise
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find(findFilter)
    .collation({ locale: 'en' })
    .toArray()

  return data.length
}
