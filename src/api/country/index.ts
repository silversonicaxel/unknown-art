import { CodeCountries } from 'src/types/country'

export const getCountryCodes = async (): Promise<CodeCountries> => {
  const countryCodesResponse = await fetch('http://country.io/names.json', {
    mode: 'no-cors'
  })
  return await countryCodesResponse.json()
}
