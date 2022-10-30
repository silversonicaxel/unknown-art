import { Place } from '../../server/api/types'
import { server } from '../../server/config'

export const getServerSideProps = async (context: any) => {
  const res = await fetch(`${server}api/place/${context.params.placeId}`)
  const place = await res.json()

  return {
    props: {
      place: place
    }
  }
}


const PlaceId = ({ place }: { place: Place }) => (
  <>
    <h1>Place {place.name}</h1>
    <main>
      {place.address}

      <a href={place.site} target="_blank" rel="noreferrer">{place.site}</a>
    </main>
  </>
)

export default PlaceId
