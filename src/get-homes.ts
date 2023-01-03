import { Address } from './get-address'
import getConsumption, {
  ConsumptionNode,
  EnergyResolution
} from './get-consumption'
import {
  EnergyPrice,
  EnergyPriceList,
  getCurrentEnergyPrice,
  getEnergyPrices,
  getEnergyPricesToday,
  getEnergyPricesTomorrow
} from './get-energy-prices'
import { MeteringPointData } from './get-metering-point-data'
import { Owner } from './get-owner'
import getProduction, { ProductionNode } from './get-production'
import query from './query'

type HomeData = {
  address: Address
  appNickname: string
  appAvatar: string
  features: {
    realTimeConsumptionEnabled: boolean
  }
  hasVentilationSystem: boolean
  id: string
  mainFuseSize: number
  meteringPointData: MeteringPointData
  numberOfResidents: number
  owner: Owner
  primaryHeatingSource: string
  size: number
  timeZone: string
  type: string
}

export type Home = HomeData & {
  getConsumption: (
    resolution?: EnergyResolution,
    last?: number
  ) => Promise<ConsumptionNode[]>
  getCurrentEnergyPrice: () => Promise<EnergyPrice>
  getEnergyPrices: () => Promise<EnergyPriceList>
  getEnergyPricesToday: () => Promise<EnergyPrice[]>
  getEnergyPricesTomorrow: () => Promise<EnergyPrice[]>
  getProduction: (
    resolution?: EnergyResolution,
    last?: number
  ) => Promise<ProductionNode[]>
}

type HomeResponse = {
  viewer: {
    home: HomeData
  }
}

type HomeListResponse = {
  viewer: {
    homes: HomeData[]
  }
}

const QUERY_HOME_FIELDS = `
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
`

/* istanbul ignore next */
const createHome = (home: HomeData): Home => ({
  ...home,
  getConsumption: (resolution?: EnergyResolution, last?: number) =>
    getConsumption(home.id, resolution, last),
  getCurrentEnergyPrice: () => getCurrentEnergyPrice(home.id),
  getEnergyPrices: () => getEnergyPrices(home.id),
  getEnergyPricesToday: () => getEnergyPricesToday(home.id),
  getEnergyPricesTomorrow: () => getEnergyPricesTomorrow(home.id),
  getProduction: (resolution?: EnergyResolution, last?: number) =>
    getProduction(home.id, resolution, last)
})

export const getHome = async (homeID: string) => {
  const result = (await query(
    `query getHome ($homeID: ID!) {
      viewer {
        home (id: $homeID) {
          ${QUERY_HOME_FIELDS}
        }
      }
    }`,
    { homeID }
  )) as HomeResponse
  return createHome(result?.viewer?.home)
}

export const getHomes = async () => {
  const result = (await query(`{
    viewer {
      homes {
        ${QUERY_HOME_FIELDS}
      }
    }
  }`)) as HomeListResponse
  return result?.viewer?.homes?.map(createHome)
}
