import query from './query'

export type Address = {
  address1: string
  address2: string
  address3: string
  postalCode: string
  city: string
  country: string
  latitude: string
  longitude: string
}

type AddressResponse = {
  viewer: {
    home: {
      address: Address
    }
  }
}

const getAddress = async (homeID: string) => {
  const result = (await query(
    `query getAddress ($homeID: ID!) {
      viewer {
        home (id: $homeID) {
          address {
            address1
            address2
            address3
            postalCode
            city
            country
            latitude
            longitude
          }
        }
      }
    }`,
    { homeID }
  )) as AddressResponse
  return result?.viewer?.home?.address
}

export default getAddress
