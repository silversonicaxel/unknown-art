import { clientPromise } from 'src/helpers/config/mongodb'
import type { CountryCode } from 'src/types/country'


export const getCountryCodes = async (): Promise<CountryCode> => {
  const mongoClient = await clientPromise

  const countryCodes = await mongoClient
    .db('ua-db')
    .collection('ua-isos')
    .findOne({}, { projection: { _id: 0 } })

  return countryCodes === null ? {} : countryCodes
}
