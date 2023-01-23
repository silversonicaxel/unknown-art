export type Place = {
  id: string
  name: string
  address: string
  site?: string
  iso: string
}

export type PlaceCountries = {
  [key: string]: number
}
