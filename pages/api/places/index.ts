//import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { Place } from '../../../server/api/types'

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

/*export default async (req, NextApiRequest, res: NextApiResponse) => {
  const data = await getPlacesData()
  res.status(200).response(JSON.parse(JSON.stringify(data)))
}*/
