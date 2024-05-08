import clientPromise from 'src/config/mongodb'
import type { Place } from 'src/types/place'

export const getPlaces = async (): Promise<Place[]> => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .find({})
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
