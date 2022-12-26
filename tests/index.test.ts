import { jest } from '@jest/globals'
import query, {
  getConsumption,
  getCurrentEnergyPrice,
  getEnergyPrices,
  getEnergyPricesToday,
  getEnergyPricesTomorrow
} from '../src/index'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const response = {
  data: {
    viewer: {
      home: {
        consumption: {
          nodes: [
            {
              from: '2022-12-26T14:00:00.000+01:00',
              to: '2022-12-26T15:00:00.000+01:00',
              cost: 3.3496786125,
              unitPrice: 0.5655375,
              unitPriceVAT: 0.1131075,
              consumption: 5.923,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T15:00:00.000+01:00',
              to: '2022-12-26T16:00:00.000+01:00',
              cost: 2.3277149875,
              unitPrice: 0.5844125,
              unitPriceVAT: 0.1168825,
              consumption: 3.983,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T16:00:00.000+01:00',
              to: '2022-12-26T17:00:00.000+01:00',
              cost: 1.598127325,
              unitPrice: 0.7750375,
              unitPriceVAT: 0.1550075,
              consumption: 2.062,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T17:00:00.000+01:00',
              to: '2022-12-26T18:00:00.000+01:00',
              cost: 1.7166233625,
              unitPrice: 0.8010375,
              unitPriceVAT: 0.1602075,
              consumption: 2.143,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T18:00:00.000+01:00',
              to: '2022-12-26T19:00:00.000+01:00',
              cost: 2.2729175625,
              unitPrice: 0.8214375,
              unitPriceVAT: 0.1642875,
              consumption: 2.767,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T19:00:00.000+01:00',
              to: '2022-12-26T20:00:00.000+01:00',
              cost: 1.7331586875,
              unitPrice: 0.7754625,
              unitPriceVAT: 0.1550925,
              consumption: 2.235,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T20:00:00.000+01:00',
              to: '2022-12-26T21:00:00.000+01:00',
              cost: 1.5699474,
              unitPrice: 0.7749,
              unitPriceVAT: 0.15498,
              consumption: 2.026,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T21:00:00.000+01:00',
              to: '2022-12-26T22:00:00.000+01:00',
              cost: 1.7229981625,
              unitPrice: 0.7248625,
              unitPriceVAT: 0.1449725,
              consumption: 2.377,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T22:00:00.000+01:00',
              to: '2022-12-26T23:00:00.000+01:00',
              cost: 2.066822025,
              unitPrice: 0.524175,
              unitPriceVAT: 0.104835,
              consumption: 3.943,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            },
            {
              from: '2022-12-26T23:00:00.000+01:00',
              to: '2022-12-27T00:00:00.000+01:00',
              cost: null,
              unitPrice: 0.381625,
              unitPriceVAT: 0.076325,
              consumption: null,
              consumptionUnit: 'kWh',
              currency: 'SEK'
            }
          ]
        },
        currentSubscription: {
          priceInfo: {
            current: {
              total: 0.5844,
              energy: 0.38,
              tax: 0.2044,
              startsAt: '2022-12-26T15:00:00.000+01:00'
            },
            today: [
              {
                total: 0.5074,
                energy: 0.3184,
                tax: 0.189,
                startsAt: '2022-12-26T00:00:00.000+01:00'
              },
              {
                total: 0.5229,
                energy: 0.3308,
                tax: 0.1921,
                startsAt: '2022-12-26T01:00:00.000+01:00'
              },
              {
                total: 0.4779,
                energy: 0.2948,
                tax: 0.1831,
                startsAt: '2022-12-26T02:00:00.000+01:00'
              },
              {
                total: 0.4071,
                energy: 0.2382,
                tax: 0.1689,
                startsAt: '2022-12-26T03:00:00.000+01:00'
              },
              {
                total: 0.3595,
                energy: 0.2001,
                tax: 0.1594,
                startsAt: '2022-12-26T04:00:00.000+01:00'
              },
              {
                total: 0.3376,
                energy: 0.1826,
                tax: 0.155,
                startsAt: '2022-12-26T05:00:00.000+01:00'
              },
              {
                total: 0.3625,
                energy: 0.2025,
                tax: 0.16,
                startsAt: '2022-12-26T06:00:00.000+01:00'
              },
              {
                total: 0.4349,
                energy: 0.2604,
                tax: 0.1745,
                startsAt: '2022-12-26T07:00:00.000+01:00'
              },
              {
                total: 0.637,
                energy: 0.4221,
                tax: 0.2149,
                startsAt: '2022-12-26T08:00:00.000+01:00'
              },
              {
                total: 0.7766,
                energy: 0.5338,
                tax: 0.2428,
                startsAt: '2022-12-26T09:00:00.000+01:00'
              },
              {
                total: 0.8526,
                energy: 0.5946,
                tax: 0.258,
                startsAt: '2022-12-26T10:00:00.000+01:00'
              },
              {
                total: 0.7756,
                energy: 0.533,
                tax: 0.2426,
                startsAt: '2022-12-26T11:00:00.000+01:00'
              },
              {
                total: 0.7618,
                energy: 0.5219,
                tax: 0.2399,
                startsAt: '2022-12-26T12:00:00.000+01:00'
              },
              {
                total: 0.5285,
                energy: 0.3353,
                tax: 0.1932,
                startsAt: '2022-12-26T13:00:00.000+01:00'
              },
              {
                total: 0.5655,
                energy: 0.3649,
                tax: 0.2006,
                startsAt: '2022-12-26T14:00:00.000+01:00'
              },
              {
                total: 0.5844,
                energy: 0.38,
                tax: 0.2044,
                startsAt: '2022-12-26T15:00:00.000+01:00'
              },
              {
                total: 0.775,
                energy: 0.5325,
                tax: 0.2425,
                startsAt: '2022-12-26T16:00:00.000+01:00'
              },
              {
                total: 0.801,
                energy: 0.5533,
                tax: 0.2477,
                startsAt: '2022-12-26T17:00:00.000+01:00'
              },
              {
                total: 0.8214,
                energy: 0.5696,
                tax: 0.2518,
                startsAt: '2022-12-26T18:00:00.000+01:00'
              },
              {
                total: 0.7755,
                energy: 0.5329,
                tax: 0.2426,
                startsAt: '2022-12-26T19:00:00.000+01:00'
              },
              {
                total: 0.7749,
                energy: 0.5324,
                tax: 0.2425,
                startsAt: '2022-12-26T20:00:00.000+01:00'
              },
              {
                total: 0.7249,
                energy: 0.4924,
                tax: 0.2325,
                startsAt: '2022-12-26T21:00:00.000+01:00'
              },
              {
                total: 0.5242,
                energy: 0.3318,
                tax: 0.1924,
                startsAt: '2022-12-26T22:00:00.000+01:00'
              },
              {
                total: 0.3816,
                energy: 0.2178,
                tax: 0.1638,
                startsAt: '2022-12-26T23:00:00.000+01:00'
              }
            ],
            tomorrow: [
              {
                total: 0.388,
                energy: 0.2229,
                tax: 0.1651,
                startsAt: '2022-12-27T00:00:00.000+01:00'
              },
              {
                total: 0.2488,
                energy: 0.1116,
                tax: 0.1372,
                startsAt: '2022-12-27T01:00:00.000+01:00'
              },
              {
                total: 0.1889,
                energy: 0.0636,
                tax: 0.1253,
                startsAt: '2022-12-27T02:00:00.000+01:00'
              },
              {
                total: 0.1792,
                energy: 0.0559,
                tax: 0.1233,
                startsAt: '2022-12-27T03:00:00.000+01:00'
              },
              {
                total: 0.2695,
                energy: 0.1281,
                tax: 0.1414,
                startsAt: '2022-12-27T04:00:00.000+01:00'
              },
              {
                total: 0.3832,
                energy: 0.219,
                tax: 0.1642,
                startsAt: '2022-12-27T05:00:00.000+01:00'
              },
              {
                total: 0.5345,
                energy: 0.3401,
                tax: 0.1944,
                startsAt: '2022-12-27T06:00:00.000+01:00'
              },
              {
                total: 1.0881,
                energy: 0.783,
                tax: 0.3051,
                startsAt: '2022-12-27T07:00:00.000+01:00'
              },
              {
                total: 1.2467,
                energy: 0.9099,
                tax: 0.3368,
                startsAt: '2022-12-27T08:00:00.000+01:00'
              },
              {
                total: 1.4399,
                energy: 1.0644,
                tax: 0.3755,
                startsAt: '2022-12-27T09:00:00.000+01:00'
              },
              {
                total: 1.4179,
                energy: 1.0468,
                tax: 0.3711,
                startsAt: '2022-12-27T10:00:00.000+01:00'
              },
              {
                total: 1.5883,
                energy: 1.1831,
                tax: 0.4052,
                startsAt: '2022-12-27T11:00:00.000+01:00'
              },
              {
                total: 1.615,
                energy: 1.2045,
                tax: 0.4105,
                startsAt: '2022-12-27T12:00:00.000+01:00'
              },
              {
                total: 1.6244,
                energy: 1.212,
                tax: 0.4124,
                startsAt: '2022-12-27T13:00:00.000+01:00'
              },
              {
                total: 1.632,
                energy: 1.2181,
                tax: 0.4139,
                startsAt: '2022-12-27T14:00:00.000+01:00'
              },
              {
                total: 1.8818,
                energy: 1.4179,
                tax: 0.4639,
                startsAt: '2022-12-27T15:00:00.000+01:00'
              },
              {
                total: 2.1222,
                energy: 1.6102,
                tax: 0.512,
                startsAt: '2022-12-27T16:00:00.000+01:00'
              },
              {
                total: 2.2739,
                energy: 1.7316,
                tax: 0.5423,
                startsAt: '2022-12-27T17:00:00.000+01:00'
              },
              {
                total: 2.3557,
                energy: 1.7971,
                tax: 0.5586,
                startsAt: '2022-12-27T18:00:00.000+01:00'
              },
              {
                total: 1.7976,
                energy: 1.3506,
                tax: 0.447,
                startsAt: '2022-12-27T19:00:00.000+01:00'
              },
              {
                total: 1.4348,
                energy: 1.0604,
                tax: 0.3744,
                startsAt: '2022-12-27T20:00:00.000+01:00'
              },
              {
                total: 1.0678,
                energy: 0.7668,
                tax: 0.301,
                startsAt: '2022-12-27T21:00:00.000+01:00'
              },
              {
                total: 1.0403,
                energy: 0.7447,
                tax: 0.2956,
                startsAt: '2022-12-27T22:00:00.000+01:00'
              },
              {
                total: 0.9945,
                energy: 0.7081,
                tax: 0.2864,
                startsAt: '2022-12-27T23:00:00.000+01:00'
              }
            ]
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
    const queryString = `{
      viewer {
        home (id: "${homeID}") {
          currentSubscription {
            priceInfo: {
              current {
                total
                startsAt
              }
            }
          }
        }
      }
    }`
    await query(queryString)
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
  })
})

describe('getConsumption', () => {
  it('should fetch the energy consumption', async () => {
    const result = await getConsumption(homeID)
    expect(global.fetch).toHaveBeenCalled()
    expect(result).toEqual(response.data.viewer.home.consumption.nodes)
  })
})

describe('getCurrentEnergyPrice', () => {
  it('should fetch the current energy price', async () => {
    const result = await getCurrentEnergyPrice(homeID)
    expect(global.fetch).toHaveBeenCalled()
    expect(result).toEqual(
      response.data.viewer.home.currentSubscription.priceInfo.current
    )
  })
})

describe('getEnergyPrices', () => {
  it('should fetch all available energy prices', async () => {
    const result = await getEnergyPrices(homeID)
    expect(global.fetch).toHaveBeenCalled()
    expect(result).toEqual(
      response.data.viewer.home.currentSubscription.priceInfo
    )
  })
})

describe('getEnergyPricesToday', () => {
  it("should fetch today's energy prices", async () => {
    const result = await getEnergyPricesToday(homeID)
    expect(global.fetch).toHaveBeenCalled()
    expect(result).toEqual(
      response.data.viewer.home.currentSubscription.priceInfo.today
    )
  })
})

describe('getEnergyPricesTomorrow', () => {
  it("should fetch tomorrow's energy prices", async () => {
    const result = await getEnergyPricesTomorrow(homeID)
    expect(global.fetch).toHaveBeenCalled()
    expect(result).toEqual(
      response.data.viewer.home.currentSubscription.priceInfo.tomorrow
    )
  })
})
