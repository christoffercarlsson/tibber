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

/* istanbul ignore next */
const getConsumption = async (
  homeID: string,
  resolution: EnergyResolution = 'HOURLY',
  last = 24
) => {
  const result = (await query(
    `query getConsumption ($homeID: ID!, $last: Int!, $resolution: EnergyResolution!) {
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
  )) as ConsumptionResponse
  return result?.viewer?.home?.consumption?.nodes
}

export default getConsumption
