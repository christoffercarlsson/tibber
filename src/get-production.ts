import query from './query'
import { EnergyResolution } from './get-consumption'

export type ProductionNode = {
  from: string
  to: string
  profit?: number
  unitPrice: number
  unitPriceVAT: number
  production?: number
  productionUnit: string
  currency: string
}

type ProductionResponse = {
  viewer: {
    home: {
      production: {
        nodes: ProductionNode[]
      }
    }
  }
}

const getProduction = async (
  homeID: string,
  resolution: EnergyResolution = 'HOURLY',
  last = 24
) => {
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
        production(resolution: ${resolution}, last: ${last}) {
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
  }`)) as ProductionResponse
  return result.viewer.home.production.nodes
}

export default getProduction
