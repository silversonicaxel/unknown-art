import { getPlaceData } from '../api/places'
import * as FetchMeta from 'fetch-meta-tags'
import { Place } from '../../components/pages/places'

export default Place

export const getServerSideProps = async (context: any) => {
  //const res = await fetch(`${server}api/place/${context.params.placeId}`)
  //const place = await res.json()

  const place = await getPlaceData(context.params.placeId)

  const metas = place.site ? await FetchMeta.default(place.site) : {}

  return {
    props: {
      place: place,
      metas: metas
    }
  }
}
