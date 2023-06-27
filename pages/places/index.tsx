//import { server } from '../../server/config'
import { getPlacesData } from '../api/places'
import { Places } from '../../components/pages/places'

export default Places

export const getServerSideProps = async (context: any) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  //const res = await fetch(`${server}api/places`)
  //const places = await res.json()
  const countryCodesResponse = await fetch('http://country.io/names.json', {
    mode: 'no-cors'
  })
  const countryCodes = await countryCodesResponse.json()

  const places = await getPlacesData()

  return {
    props: {
      places: places,
      countryCodes: countryCodes
    }
  }
}
