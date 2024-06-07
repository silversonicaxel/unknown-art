export type SearchPlacesFormInput = {
  name?: string
  iso?: string
  city?: string
}

export type SearchPlacesApi = {
  name?: { $regex: string, $options: string }
  iso?: string
  city?: { $regex: string, $options: string }
}
