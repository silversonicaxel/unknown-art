import { clientPromise } from 'src/helpers/config/mongodb'
import type { CountryCode } from 'src/types/country'


export const getCountryCodes = async (): Promise<CountryCode> => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db('ua-db')
    .collection('ua-isos')
    .find({}, { projection: { _id: 0 } })
    .collation({ locale: 'en' })
    .toArray()

  return data[0]
}
