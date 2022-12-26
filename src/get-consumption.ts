import query from './query'

export type EnergyResolution =
  | 'HOURLY'
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'ANNUAL'

export type ConsumptionNode = {
  from: string
  to: string
  cost: number
  unitPrice: number
  unitPriceVAT: number
  consumption: number
  consumptionUnit: string
  currency: string
}

type ConsumptionResponse = {
  viewer: {
    home: {
      consumption: {
        nodes: ConsumptionNode[]
      }
    }
  }
}

const getConsumption = async (
  homeID: string,
  resolution: EnergyResolution = 'HOURLY',
  last = 24
) => {
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
        consumption(resolution: ${resolution}, last: ${last}) {
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
  }`)) as ConsumptionResponse
  return result.viewer.home.consumption.nodes
}

export default getConsumption
