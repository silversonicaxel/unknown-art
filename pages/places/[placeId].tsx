import { memo } from 'react'
import type { Place } from '../../server/api/types'
import Header from '../../views/header'
//import { server } from '../../server/config'
import { getPlaceData } from '../api/places'
import { Suspense } from 'react'
import Loading from '../../views/loading/loading'

type PlaceProps = { place: Place }

export const getServerSideProps = async (context: any) => {
  //const res = await fetch(`${server}api/place/${context.params.placeId}`)
  //const place = await res.json()

  const place = await getPlaceData(context.params.placeId)

  return {
    props: {
      place: place
    }
  }
}

const PlaceId = ({ place }: PlaceProps) => (
  <Suspense fallback={<Loading text='place' />}>
    <Header title={place.name} />

    <h1>{place.name}</h1>
    <main>
      <a
        href={`https://www.google.com/maps/place/${place.address}`}
        target='_blank'
        rel='noreferrer'
      >
        {place.address}
      </a>
      <br />
      <a href={place.site} target='_blank' rel='noreferrer'>
        {place.site}
      </a>
    </main>
  </Suspense>
)

export default memo(PlaceId)
