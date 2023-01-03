import query from './query'

export type MeteringPointData = {
  consumptionEan: string
  energyTaxType: string
  estimatedAnnualConsumption: number
  gridAreaCode: string
  gridCompany: string
  priceAreaCode: string
  productionEan: string
  vatType: string
}

type MeteringPointDataResponse = {
  viewer: {
    home: {
      meteringPointData: MeteringPointData
    }
  }
}

const getMeteringPointData = async (homeID: string) => {
  const result = (await query(
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
  )) as MeteringPointDataResponse
  return result?.viewer?.home?.meteringPointData
}

export default getMeteringPointData
