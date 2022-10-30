import { server } from '../../server/config'
import { Place } from '../../server/api/types'
import Link from 'next/link'

export const getStaticProps = async () => {
  const res = await fetch(`${server}api/places`)
  const places = await res.json()

  return {
    props: {
      places: places
    }
  }
}

const Places = ({ places }: { places: Place[] }) => (
  <>
    <h1>Places</h1>
    {places.map((place, idx) => (
      <div key={idx}>
        <Link href={`places/${place.id}`}>{place.name}</Link>
      </div>))
    }
  </>
)

export default Places
