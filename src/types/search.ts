import { CountryCode } from './country'


export type SearchBookshopsFormInput = {
  name?: string | null
  iso?: string | null
  city?: string | null
  website?: string | null
}

export type SearchBookshopsFormInputOptions = {
  iso?: CountryCode
}

export type SearchBookshopsApi = {
  name?: { $regex: string, $options: string }
  iso?: string
  city?: { $regex: string, $options: string }
  site?: { $exists: boolean }
}
