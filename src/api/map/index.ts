import type { MapCoordinates, MapResponse } from 'src/types/map'


export const getMapCoordinates = async (address: string): Promise<MapCoordinates> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
  )
  const data: MapResponse[] = await response.json()
  console.log('data', data)

  return [parseFloat(data[0].lon), parseFloat(data[0].lat)]
}
