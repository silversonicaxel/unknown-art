import clientPromise from 'src/config/mongodb'
import type { ApiQuery } from 'src/types/api'
import type { CodeCountry } from 'src/types/country'

export const getCountryCodes = async (): Promise<CodeCountry> => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-isos')
    .find()
    .collation({ locale: 'en' })
    .toArray()

  return data[0]
}
