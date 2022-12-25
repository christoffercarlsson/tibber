import { jest } from '@jest/globals'
import query from '../src/index'

const response = {
  data: {
    viewer: {
      homes: [
        {
          currentSubscription: {
            priceInfo: {
              current: {
                total: 1.6478,
                energy: 1.2308,
                tax: 0.417,
                startsAt: '2022-12-25T15:00:00.000+01:00'
              },
              today: [
                {
                  total: 1.7904,
                  energy: 1.3448,
                  tax: 0.4456,
                  startsAt: '2022-12-25T00:00:00.000+01:00'
                },
                {
                  total: 1.6762,
                  energy: 1.2535,
                  tax: 0.4227,
                  startsAt: '2022-12-25T01:00:00.000+01:00'
                }
              ]
            }
          }
        }
      ]
    }
  }
}

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(JSON.stringify(response)))
)

describe('query', () => {
  it('should perform queries towards the Tibber API', async () => {
    process.env.TIBBER_API_TOKEN = 'abc123'
    const queryString = `viewer {
      homes {
        id
        currentSubscription{
          priceInfo {
            today {
              total
              startsAt
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
