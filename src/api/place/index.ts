import { Place } from '../../../src/types/place'
import clientPromise from '../../config/mongodb'

export const getPlacesData = async (): Promise<Place[]> => {
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

export const getPlaceData = async (placeId: string): Promise<Place> => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .findOne({ id: placeId })

  return JSON.parse(JSON.stringify(data))
}
