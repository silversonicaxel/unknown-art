export type SearchPlacesFormInput = {
  name?: string
}

export type SearchPlacesApi = {
  name?: { $regex: string, $options: string }
}
