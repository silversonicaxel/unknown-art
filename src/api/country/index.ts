import { clientPromise } from 'helpers/config/mongodb'
import { filterObjectByKeys } from 'helpers/utils/filterObjectByKeys'
import type { CountryCode } from 'types/country'


export const getCountryCodesList = async (): Promise<CountryCode> => {
  const mongoClient = await clientPromise

  const isos = await mongoClient
    .db('ua-db')
    .collection('ua-isos')
    .findOne({}, { projection: { _id: 0 } })

  return isos === null ? {} : isos
}

export const getPlacesCountryCodesList = async (): Promise<CountryCode> => {
  const mongoClient = await clientPromise

  const relevantIsos = await mongoClient
    .db('ua-db')
    .collection('ua-places')
    .distinct('iso')

  const isos = await mongoClient
    .db('ua-db')
    .collection('ua-isos')
    .findOne({}, { projection: { _id: 0 } })

  const countryCodes = filterObjectByKeys(isos ?? {}, relevantIsos, true)
  return countryCodes ?? {}
}
