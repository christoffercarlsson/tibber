import { jest } from '@jest/globals'
import query, { getCurrentEnergyPrice } from '../src/index'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const response = {
  data: {
    viewer: {
      home: {
        currentSubscription: {
          priceInfo: {
            current: {
              total: 1.6478,
              energy: 1.2308,
              tax: 0.417
            }
          }
        }
      }
    }
  }
}

const homeID = '96a14971-525a-4420-aae9-e5aedaa129ff'

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(JSON.stringify(response)))
)

describe('query', () => {
  it('should perform queries towards the Tibber API', async () => {
    const queryString = `viewer {
      home (id: "${homeID}") {
        currentSubscription{
          priceInfo: {
            current: {
              total
              energy
              tax
            }
          }
        }
      }
    }`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await query(queryString)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.tibber.com/v1-beta/gql',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.TIBBER_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: queryString })
      }
    )
    expect(result).toEqual(response.data)
  })
})

describe('getCurrentEnergyPrice', () => {
  it('fetch the current energy price from the Tibber API', async () => {
    const result = await getCurrentEnergyPrice(homeID)
    expect(result).toEqual(
      response.data.viewer.home.currentSubscription.priceInfo.current
    )
  })
})
