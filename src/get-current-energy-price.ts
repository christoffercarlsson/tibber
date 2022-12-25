import query from './query'

const getCurrentEnergyPrice = async (homeID: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = await query(`{
    viewer {
      home (id: "${homeID}") {
        currentSubscription {
          priceInfo {
            current {
              total
              energy
              tax
            }
          }
        }
      }
    }
  }`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return result.viewer.home.currentSubscription.priceInfo.current as {
    total: number
    energy: number
    tax: number
  }
}

export default getCurrentEnergyPrice
