//import { server } from '../../server/config'
import { Place } from '../../server/api/types'
import Link from 'next/link'
import { getPlacesData } from '../api/places'

export const getServerSideProps = async () => {
  //const res = await fetch(`${server}api/places`)
  //const places = await res.json()
  const places = await getPlacesData()

  return {
    props: {
      places: places
    }
  }
}

const Places = ({ places }: { places: Place[] }) => (
  <>
    <h1>places</h1>
    {places.map((place, idx) => (
      <div key={idx}>
        <Link href={`places/${place.id}`}>{place.name}</Link>
      </div>
    ))}
  </>
)

export default Places
