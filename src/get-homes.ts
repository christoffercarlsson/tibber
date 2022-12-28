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
import getMeteringPointData, {
  MeteringPointData
} from './get-metering-point-data'
import getOwner, { Owner } from './get-owner'
import getProduction, { ProductionNode } from './get-production'
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
  numberOfResidents: number
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
  getMeteringPointData: () => Promise<MeteringPointData>
  getOwner: () => Promise<Owner>
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

/* istanbul ignore next */
const createHome = (home: HomeData): Home => ({
  ...home,
  getConsumption: (resolution?: EnergyResolution, last?: number) =>
    getConsumption(home.id, resolution, last),
  getCurrentEnergyPrice: () => getCurrentEnergyPrice(home.id),
  getEnergyPrices: () => getEnergyPrices(home.id),
  getEnergyPricesToday: () => getEnergyPricesToday(home.id),
  getEnergyPricesTomorrow: () => getEnergyPricesTomorrow(home.id),
  getMeteringPointData: () => getMeteringPointData(home.id),
  getOwner: () => getOwner(home.id),
  getProduction: (resolution?: EnergyResolution, last?: number) =>
    getProduction(home.id, resolution, last)
})

export const getHome = async (homeID: string) => {
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
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
        numberOfResidents
        primaryHeatingSource
        size
        timeZone
        type
      }
    }
  }`)) as HomeResponse
  return createHome(result?.viewer?.home)
}

export const getHomes = async () => {
  const result = (await query(`{
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
        numberOfResidents
        primaryHeatingSource
        size
        timeZone
        type
      }
    }
  }`)) as HomeListResponse
  return result?.viewer?.homes?.map(createHome)
}
