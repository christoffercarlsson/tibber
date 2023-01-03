import query from './query'

export type EnergyPrice = {
  currency: string
  energy: number
  level: string
  startsAt: string
  tax: number
  total: number
}

export type EnergyPriceList = {
  current: EnergyPrice
  today: EnergyPrice[]
  tomorrow?: EnergyPrice[]
}

type EnergyPriceResponse = {
  viewer: {
    home: {
      currentSubscription: {
        priceInfo: EnergyPriceList
      }
    }
  }
}

export const getCurrentEnergyPrice = async (homeID: string) => {
  const result = (await query(
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
  )) as EnergyPriceResponse
  return result?.viewer?.home?.currentSubscription?.priceInfo?.current
}

export const getEnergyPrices = async (homeID: string) => {
  const result = (await query(
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
  )) as EnergyPriceResponse
  return result?.viewer?.home?.currentSubscription?.priceInfo
}

export const getEnergyPricesToday = async (homeID: string) => {
  const result = (await query(
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
  )) as EnergyPriceResponse
  return result?.viewer?.home?.currentSubscription?.priceInfo?.today
}

export const getEnergyPricesTomorrow = async (homeID: string) => {
  const result = (await query(
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
  )) as EnergyPriceResponse
  return result?.viewer?.home?.currentSubscription?.priceInfo?.tomorrow
}
