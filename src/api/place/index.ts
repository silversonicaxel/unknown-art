import clientPromise from 'src/config/mongodb'
import type { ApiQuery } from 'src/types/api'
import type { Place } from 'src/types/place'


export const getPlacesList = async (query: ApiQuery = {}): Promise<Place[]> => {
  const { search, ...options } = query
  const findFilter = search ? { name: { $regex: search, $options: 'si' } } : {}
  const findOptions = {
    limit: options.limit,
    skip: (options.offset ?? 0) * (options.limit ?? 0)
  }

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
