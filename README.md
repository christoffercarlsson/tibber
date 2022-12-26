# Tibber

This NPM package provides a collection of easy-to-use methods to interact with
the [Tibber GraphQL API](https://developer.tibber.com/explorer).

## Installation

```console
$ npm i --save tibber
```

## Usage

Set your token via the `TIBBER_API_TOKEN` environment variable and then use the
following methods to interact with the Tibber API:

### `getCurrentEnergyPrice: (homeID: string) => Promise<EnergyPrice>`

Get the current energy price for a given home ID.

```ts
import { getCurrentEnergyPrice } from 'tibber'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const price = await getCurrentEnergyPrice(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(price)
// {
//   energy: 0.38,
//   startsAt: '2022-12-26T15:00:00.000+01:00'
//   tax: 0.2044,
//   total: 0.5844,
// }
```

### `getEnergyPrices: (homeID: string) => Promise<EnergyPriceList>`

Get all energy prices for a given home ID.

```ts
import { getEnergyPrices } from 'tibber'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const prices = await getEnergyPrices('96a14971-525a-4420-aae9-e5aedaa129ff')

console.log(prices)
// {
//   current: {
//     total: 0.5844,
//     energy: 0.38,
//     tax: 0.2044,
//     startsAt: '2022-12-26T15:00:00.000+01:00'
//   },
//   today: [
//     {
//       total: 0.5074,
//       energy: 0.3184,
//       tax: 0.189,
//       startsAt: '2022-12-26T00:00:00.000+01:00'
//     },
//     {
//       total: 0.5229,
//       energy: 0.3308,
//       tax: 0.1921,
//       startsAt: '2022-12-26T01:00:00.000+01:00'
//     },
//     ...
//   ],
//   tomorrow: [
//     {
//       total: 0.388,
//       energy: 0.2229,
//       tax: 0.1651,
//       startsAt: '2022-12-27T00:00:00.000+01:00'
//     },
//     {
//       total: 0.2488,
//       energy: 0.1116,
//       tax: 0.1372,
//       startsAt: '2022-12-27T01:00:00.000+01:00'
//     },
//     ...
//   ]
// }
```

### `getEnergyPricesToday: (homeID: string) => Promise<EnergyPrice[]>`

Get today's energy prices for a given home ID.

```ts
import { getEnergyPricesToday } from 'tibber'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const prices = await getEnergyPricesToday(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(prices)
// [
//   {
//     total: 0.5074,
//     energy: 0.3184,
//     tax: 0.189,
//     startsAt: '2022-12-26T00:00:00.000+01:00'
//   },
//   {
//     total: 0.5229,
//     energy: 0.3308,
//     tax: 0.1921,
//     startsAt: '2022-12-26T01:00:00.000+01:00'
//   },
//   ...
// ]
```

### `getEnergyPricesTomorrow: (homeID: string) => Promise<EnergyPrice[]>`

Get tomorrow's energy prices for a given home ID.

```ts
import { getEnergyPricesTomorrow } from 'tibber'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const prices = await getEnergyPricesTomorrow(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(prices)
// [
//   {
//     total: 0.388,
//     energy: 0.2229,
//     tax: 0.1651,
//     startsAt: '2022-12-27T00:00:00.000+01:00'
//   },
//   {
//     total: 0.2488,
//     energy: 0.1116,
//     tax: 0.1372,
//     startsAt: '2022-12-27T01:00:00.000+01:00'
//   },
//   ...
// ]
```

### `query: (queryString: string) => Promise<unknown>`

Perform a given query against the Tibber GraphQL API.

```ts
import query from 'tibber'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const result = await query(`
  viewer {
    homes {
      currentSubscription {
        priceInfo {
          today {
            total
            startsAt
          }
        }
      }
    }
  }
`)

console.log(result)
// {
//   viewer: {
//     homes: [
//       {
//         currentSubscription: {
//           priceInfo: {
//             today: [
//               {
//                 total: 1.7904,
//                 startsAt: '2022-12-25T00:00:00.000+01:00'
//               },
//               {
//                 total: 1.6762,
//                 startsAt: '2022-12-25T01:00:00.000+01:00'
//               },
//               ...
//             ]
//           }
//         }
//       },
//       ...
//     ]
//   }
// }
```

## License

This project is licensed under [The Unlicense](./LICENSE).
