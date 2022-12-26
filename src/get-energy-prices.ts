import query from './query'

export type EnergyPrice = {
  energy: number
  startsAt: string
  tax: number
  total: number
}

export type EnergyPriceList = {
  current?: EnergyPrice
  today?: EnergyPrice[]
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
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
        currentSubscription {
          priceInfo {
            current {
              energy
              startsAt
              total
              tax
            }
          }
        }
      }
    }
  }`)) as EnergyPriceResponse
  return result.viewer.home.currentSubscription.priceInfo.current
}

export const getEnergyPrices = async (homeID: string) => {
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
        currentSubscription {
          priceInfo {
            current {
              energy
              startsAt
              total
              tax
            }
            today {
              energy
              startsAt
              total
              tax
            }
            tomorrow {
              energy
              startsAt
              total
              tax
            }
          }
        }
      }
    }
  }`)) as EnergyPriceResponse
  return result.viewer.home.currentSubscription.priceInfo
}

export const getEnergyPricesToday = async (homeID: string) => {
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
        currentSubscription {
          priceInfo {
            today {
              energy
              startsAt
              total
              tax
            }
          }
        }
      }
    }
  }`)) as EnergyPriceResponse
  return result.viewer.home.currentSubscription.priceInfo.today
}

export const getEnergyPricesTomorrow = async (homeID: string) => {
  const result = (await query(`{
    viewer {
      home (id: "${homeID}") {
        currentSubscription {
          priceInfo {
            tomorrow {
              energy
              startsAt
              total
              tax
            }
          }
        }
      }
    }
  }`)) as EnergyPriceResponse
  return result.viewer.home.currentSubscription.priceInfo.tomorrow
}
