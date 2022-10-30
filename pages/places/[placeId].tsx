import { useRouter } from 'next/router'

const PlaceId = () => {
  const router = useRouter()

  const placeId = router.query.placeId

  return <h1>Place {placeId}</h1>
}

export default PlaceId
