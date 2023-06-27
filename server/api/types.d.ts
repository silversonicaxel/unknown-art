export type DbPlace = {
  id: string
  name: string
  address: string
  site?: string
  iso: string
}

export type DbPlaceCountries = {
  [key: string]: number
}
