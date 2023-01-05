import { memo } from 'react'
import { Place } from '../../server/api/types'
import Header from '../../views/header'
//import { server } from '../../server/config'
import { getPlaceData } from '../api/places'

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

const PlaceId = ({ place }: { place: Place }) => (
  <>
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
  </>
)

export default memo(PlaceId)
