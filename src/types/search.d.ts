import { CountryCode } from './country'


export type SearchPlacesFormInput = {
  name?: string | null
  iso?: string | null
  city?: string | null
  website?: string | null
}

export type SearchPlacesFormInputOptions = {
  iso?: CountryCode
}

export type SearchPlacesApi = {
  name?: { $regex: string, $options: string }
  iso?: string
  city?: { $regex: string, $options: string }
  site?: { $exists: boolean }
}
