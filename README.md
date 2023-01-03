# Tibber

This NPM package provides a collection of easy-to-use methods for querying the
[Tibber GraphQL API](https://developer.tibber.com/explorer).

## Installation

```console
$ npm i --save tibber
```

## Usage

Start by setting your token using the `setToken()` method and then use the
methods listed below to interact with the Tibber API.

> **Note**: The `setToken()` method _must be called once_ from anywhere in your
> code before calling any of the other API methods.

Here's an example for getting the current energy price for a given home ID:

```ts
import { getCurrentEnergyPrice, setToken } from 'tibber'

setToken('5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE')

const price = await getCurrentEnergyPrice(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(price)
// {
//   currency: 'SEK',
//   energy: 0.38,
//   startsAt: '2022-12-26T15:00:00.000+01:00'
//   tax: 0.2044,
//   total: 0.5844,
// }
```

## API reference

### `getAddress: (homeID: string) => Promise<Address>`

Get the address for a given home ID.

```ts
import { getAddress } from 'tibber'

const result = await getAddress('96a14971-525a-4420-aae9-e5aedaa129ff')

console.log(result)
// {
//   address1: '1 Apple Park Way',
//   address2: null,
//   address3: null,
//   postalCode: 'CA 95014',
//   city: 'Cupertino',
//   country: 'USA',
//   longitude: 37.334722,
//   latitude: -122.008889
// }
```

### `getConsumption: (homeID: string, resolution?: EnergyResolution, last?: number) => Promise<ConsumptionNode[]>`

Get the energy consumption for a given home ID.

```ts
import { getConsumption } from 'tibber'

const result = await getConsumption('96a14971-525a-4420-aae9-e5aedaa129ff')

console.log(result)
// [
//   {
//     from: '2022-12-26T14:00:00.000+01:00',
//     to: '2022-12-26T15:00:00.000+01:00',
//     cost: 3.3496786125,
//     unitPrice: 0.5655375,
//     unitPriceVAT: 0.1131075,
//     consumption: 5.923,
//     consumptionUnit: 'kWh',
//     currency: 'SEK'
//   },
//   {
//     from: '2022-12-26T15:00:00.000+01:00',
//     to: '2022-12-26T16:00:00.000+01:00',
//     cost: 2.3277149875,
//     unitPrice: 0.5844125,
//     unitPriceVAT: 0.1168825,
//     consumption: 3.983,
//     consumptionUnit: 'kWh',
//     currency: 'SEK'
//   },
//   ...
// ]
```

### `getCurrentEnergyPrice: (homeID: string) => Promise<EnergyPrice>`

Get the current energy price for a given home ID.

```ts
import { getCurrentEnergyPrice } from 'tibber'

const price = await getCurrentEnergyPrice(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(price)
// {
//   currency: 'SEK',
//   energy: 0.38,
//   level: 'EXPENSIVE',
//   startsAt: '2022-12-26T15:00:00.000+01:00'
//   tax: 0.2044,
//   total: 0.5844,
// }
```

### `getEnergyPrices: (homeID: string) => Promise<EnergyPriceList>`

Get all energy prices for a given home ID.

```ts
import { getEnergyPrices } from 'tibber'

const prices = await getEnergyPrices('96a14971-525a-4420-aae9-e5aedaa129ff')

console.log(prices)
// {
//   current: {
//     currency: 'SEK',
//     energy: 0.38,
//     level: 'EXPENSIVE',
//     startsAt: '2022-12-26T15:00:00.000+01:00'
//     tax: 0.2044,
//     total: 0.5844,
//   },
//   today: [
//     {
//       currency: 'SEK',
//       energy: 0.3184,
//       level: 'EXPENSIVE',
//       startsAt: '2022-12-26T00:00:00.000+01:00'
//       tax: 0.189,
//       total: 0.5074,
//     },
//     {
//       currency: 'SEK',
//       energy: 0.3308,
//       level: 'EXPENSIVE',
//       startsAt: '2022-12-26T01:00:00.000+01:00'
//       tax: 0.1921,
//       total: 0.5229,
//     },
//     ...
//   ],
//   tomorrow: [
//     {
//       currency: 'SEK',
//       energy: 0.2229,
//       level: 'NORMAL',
//       startsAt: '2022-12-27T00:00:00.000+01:00'
//       tax: 0.1651,
//       total: 0.388,
//     },
//     {
//       currency: 'SEK',
//       energy: 0.1116,
//       level: 'CHEAP',
//       startsAt: '2022-12-27T01:00:00.000+01:00'
//       tax: 0.1372,
//       total: 0.2488,
//     },
//     ...
//   ]
// }
```

### `getEnergyPricesToday: (homeID: string) => Promise<EnergyPrice[]>`

Get today's energy prices for a given home ID.

```ts
import { getEnergyPricesToday } from 'tibber'

const prices = await getEnergyPricesToday(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(prices)
// [
//   {
//     currency: 'SEK',
//     energy: 0.3184,
//     level: 'EXPENSIVE',
//     startsAt: '2022-12-26T00:00:00.000+01:00'
//     tax: 0.189,
//     total: 0.5074,
//   },
//   {
//     currency: 'SEK',
//     energy: 0.3308,
//     level: 'VERY_EXPENSIVE',
//     startsAt: '2022-12-26T01:00:00.000+01:00'
//     tax: 0.1921,
//     total: 0.5229,
//   },
//   ...
// ]
```

### `getEnergyPricesTomorrow: (homeID: string) => Promise<EnergyPrice[]>`

Get tomorrow's energy prices for a given home ID.

```ts
import { getEnergyPricesTomorrow } from 'tibber'

const prices = await getEnergyPricesTomorrow(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log(prices)
// [
//   {
//     currency: 'SEK',
//     energy: 0.2229,
//     level: 'VERY_EXPENSIVE',
//     startsAt: '2022-12-27T00:00:00.000+01:00'
//     tax: 0.1651,
//     total: 0.388,
//   },
//   {
//     currency: 'SEK',
//     energy: 0.1116,
//     level: 'EXPENSIVE',
//     startsAt: '2022-12-27T01:00:00.000+01:00'
//     tax: 0.1372,
//     total: 0.2488,
//   },
//   ...
// ]
```

### `getHome: (homeID: string) => Promise<Home>`

Get a home with a given ID.

```ts
import { getHome } from 'tibber'

const {
  address: { longitude, latitude },
  getConsumption
} = await getHome('96a14971-525a-4420-aae9-e5aedaa129ff')

const consumption = await getConsumption()

console.log({ longitude, latitude, consumption })
// {
//   longitude: 37.334722,
//   latitude: -122.008889,
//   consumption: [
//     {
//       from: '2022-12-26T14:00:00.000+01:00',
//       to: '2022-12-26T15:00:00.000+01:00',
//       cost: 3.3496786125,
//       unitPrice: 0.5655375,
//       unitPriceVAT: 0.1131075,
//       consumption: 5.923,
//       consumptionUnit: 'kWh',
//       currency: 'SEK'
//     },
//     {
//       from: '2022-12-26T15:00:00.000+01:00',
//       to: '2022-12-26T16:00:00.000+01:00',
//       cost: 2.3277149875,
//       unitPrice: 0.5844125,
//       unitPriceVAT: 0.1168825,
//       consumption: 3.983,
//       consumptionUnit: 'kWh',
//       currency: 'SEK'
//     },
//     ...
//   ]
// }
```

### `getHomes: () => Promise<Home[]>`

Get all homes.

```ts
import { getHomes } from 'tibber'

const homes = await getHomes()

const owners = homes.map((home) => {
  const { firstName, lastName } = home.owner
  return { firstName, lastName }
})

console.log(owners)
// [
//   { firstName: 'Tony', lastName: 'Stark' },
//   { firstName: 'Steve', lastName: 'Rogers' }
// ]
```

### `getMeteringPointData: (homeID: string) => Promise<MeteringPointData>`

Get metering point data for a given home ID.

```ts
import { getMeteringPointData } from 'tibber'

const data = await getMeteringPointData('96a14971-525a-4420-aae9-e5aedaa129ff')

console.log(data)
// {
//   consumptionEan: '735999102107573183',
//   energyTaxType: 'normal',
//   estimatedAnnualConsumption: 29772,
//   gridAreaCode: 'STH',
//   gridCompany: 'Ellevio AB',
//   priceAreaCode: 'SE3',
//   productionEan: '735999102111362582',
//   vatType: 'normal'
// }
```

### `getOwner: (homeID: string) => Promise<Owner>`

Get the owner for a given home ID.

```ts
import { getOwner } from 'tibber'

const { firstName, lastName } = await getOwner(
  '96a14971-525a-4420-aae9-e5aedaa129ff'
)

console.log({ firstName, lastName })
// { firstName: 'Tony', lastName: 'Stark' }
```

### `getProduction: (homeID: string, resolution?: EnergyResolution, last?: number) => Promise<ProductionNode[]>`

Get the energy production for a given home ID.

```ts
import { getProduction } from 'tibber'

const result = await getProduction('96a14971-525a-4420-aae9-e5aedaa129ff')

console.log(result)
// [
//   {
//     from: '2022-12-26T14:00:00.000+01:00',
//     to: '2022-12-26T15:00:00.000+01:00',
//     profit: null,
//     unitPrice: 0.36493,
//     unitPriceVAT: 0,
//     production: null,
//     productionUnit: 'kWh',
//     currency: 'SEK'
//   },
//   {
//     from: '2022-12-26T15:00:00.000+01:00',
//     to: '2022-12-26T16:00:00.000+01:00',
//     profit: null,
//     unitPrice: 0.38003,
//     unitPriceVAT: 0,
//     production: null,
//     productionUnit: 'kWh',
//     currency: 'SEK'
//   },
//   ...
// ]
```

### `query: (queryString: string) => Promise<unknown>`

Perform a given query against the Tibber GraphQL API.

```ts
import { query } from 'tibber'

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

### `setToken: (token: string) => void`

Set the token that will be used to authenticate with the Tibber API.

This method must be called once from anywhere in your code before calling any of
the other API methods.

```ts
import { setToken } from 'tibber'

setToken('5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE')
```

## License

This project is licensed under [The Unlicense](./LICENSE).
