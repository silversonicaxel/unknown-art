export type SearchPlacesFormInput = {
  name?: string
  iso?: string
}

export type SearchPlacesApi = {
  name?: { $regex: string, $options: string }
  iso?: string
}
