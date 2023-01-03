import { jest } from '@jest/globals'
import {
  getAddress,
  getConsumption,
  getCurrentEnergyPrice,
  getEnergyPrices,
  getEnergyPricesToday,
  getEnergyPricesTomorrow,
  getHome,
  getHomes,
  getMeteringPointData,
  getOwner,
  getProduction,
  query,
  setToken
} from '../src/index'

const token = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

setToken(token)

const url = 'https://api.tibber.com/v1-beta/gql'

const homeID = '96a14971-525a-4420-aae9-e5aedaa129ff'

const getFetchParams = (queryString: string, variables?: object) => ({
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query: queryString.replace(/\s+/g, ' '), variables })
})

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(JSON.stringify({ data: {} })))
)

describe('getAddress', () => {
  it('should fetch address', async () => {
    await getAddress(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
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
      )
    )
  })
})

describe('getConsumption', () => {
  it('should fetch the energy consumption', async () => {
    const resolution = 'ANNUAL'
    const last = 11
    await getConsumption(homeID, resolution, last)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              consumption (resolution: $resolution, last: $last) {
                nodes {
                  from
                  to
                  cost
                  unitPrice
                  unitPriceVAT
                  consumption
                  consumptionUnit
                  currency
                }
              }
            }
          }
        }`,
        { homeID, last, resolution }
      )
    )
  })
})

describe('getCurrentEnergyPrice', () => {
  it('should fetch the current energy price', async () => {
    await getCurrentEnergyPrice(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              currentSubscription {
                priceInfo {
                  current {
                    currency
                    energy
                    level
                    startsAt
                    total
                    tax
                  }
                }
              }
            }
          }
        }`,
        { homeID }
      )
    )
  })
})

describe('getEnergyPrices', () => {
  it('should fetch all available energy prices', async () => {
    await getEnergyPrices(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              currentSubscription {
                priceInfo {
                  current {
                    currency
                    energy
                    level
                    startsAt
                    total
                    tax
                  }
                  today {
                    currency
                    energy
                    level
                    startsAt
                    total
                    tax
                  }
                  tomorrow {
                    currency
                    energy
                    level
                    startsAt
                    total
                    tax
                  }
                }
              }
            }
          }
        }`,
        { homeID }
      )
    )
  })
})

describe('getEnergyPricesToday', () => {
  it("should fetch today's energy prices", async () => {
    await getEnergyPricesToday(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              currentSubscription {
                priceInfo {
                  today {
                    currency
                    energy
                    level
                    startsAt
                    total
                    tax
                  }
                }
              }
            }
          }
        }`,
        { homeID }
      )
    )
  })
})

describe('getEnergyPricesTomorrow', () => {
  it("should fetch tomorrow's energy prices", async () => {
    await getEnergyPricesTomorrow(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              currentSubscription {
                priceInfo {
                  tomorrow {
                    currency
                    energy
                    level
                    startsAt
                    total
                    tax
                  }
                }
              }
            }
          }
        }`,
        { homeID }
      )
    )
  })
})

describe('getHomes', () => {
  it('should fetch home data', async () => {
    await getHome(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
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
              appNickname
              appAvatar
              features {
                realTimeConsumptionEnabled
              }
              hasVentilationSystem
              id
              mainFuseSize
              meteringPointData {
                consumptionEan
                energyTaxType
                estimatedAnnualConsumption
                gridAreaCode
                gridCompany
                priceAreaCode
                productionEan
                vatType
              }
              numberOfResidents
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
              primaryHeatingSource
              size
              timeZone
              type
            }
          }
        }`,
        { homeID }
      )
    )
  })

  it('should fetch data for all homes', async () => {
    await getHomes()
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            homes {
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
              appNickname
              appAvatar
              features {
                realTimeConsumptionEnabled
              }
              hasVentilationSystem
              id
              mainFuseSize
              meteringPointData {
                consumptionEan
                energyTaxType
                estimatedAnnualConsumption
                gridAreaCode
                gridCompany
                priceAreaCode
                productionEan
                vatType
              }
              numberOfResidents
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
              primaryHeatingSource
              size
              timeZone
              type
            }
          }
        }`
      )
    )
  })
})

describe('getMeteringPointData', () => {
  it('should fetch metering point data', async () => {
    await getMeteringPointData(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              meteringPointData {
                consumptionEan
                energyTaxType
                estimatedAnnualConsumption
                gridAreaCode
                gridCompany
                priceAreaCode
                productionEan
                vatType
              }
            }
          }
        }`,
        { homeID }
      )
    )
  })
})

describe('getOwner', () => {
  it('should fetch owner data', async () => {
    await getOwner(homeID)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
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
      )
    )
  })
})

describe('getProduction', () => {
  it('should fetch the energy production', async () => {
    const resolution = 'WEEKLY'
    const last = 42
    await getProduction(homeID, resolution, last)
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(
        `{
          viewer {
            home (id: $homeID) {
              production (resolution: $resolution, last: $last) {
                nodes {
                  from
                  to
                  profit
                  unitPrice
                  unitPriceVAT
                  production
                  productionUnit
                  currency
                }
              }
            }
          }
        }`,
        { homeID, last, resolution }
      )
    )
  })
})

describe('query', () => {
  it('should perform queries towards the Tibber API', async () => {
    const queryString = `{
      viewer {
        home (id: $homeID) {
          currentSubscription {
            priceInfo {
              current {
                total
                startsAt
              }
            }
          }
        }
      }
    }`
    await query(queryString, { homeID })
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      getFetchParams(queryString, { homeID })
    )
  })
})
