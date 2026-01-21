import { Address } from './get-address'
import query from './query'

export type Owner = {
  id: string
  firstName: string
  isCompany: boolean
  name: string
  middleName: string
  lastName: string
  organizationNo: string
  language: string
  contactInfo: {
    email: string
    mobile: string
  }
  address: Address
}

type OwnerResponse = {
  viewer: {
    home: {
      owner: Owner
    }
  }
}

const getOwner = async (homeID: string) => {
  const result = (await query(
    `query getOwner ($homeID: ID!) {
      viewer {
        home (id: $homeID) {
          owner {
            id
            firstName
            isCompany
            name
            middleName
            lastName
            organizationNo
            language
            contactInfo {
              email
              mobile
            }
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
      }
    }`,
    { homeID }
  )) as OwnerResponse
  return result?.viewer?.home?.owner
}

export default getOwner
