# Tibber

## Installation

```console
$ npm i --save tibber
```

## Usage

Set your Tibber API token via the `TIBBER_API_TOKEN` environment variable and
then call the `query` method with your query string as the first parameter:

```ts
import query from 'tibber'

process.env.TIBBER_API_TOKEN = '5K4MVS-OjfWhK_4yrjOlFe1F6kJXPVf7eQYggo8ebAE'

const prices = await query(`
  viewer {
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
  }
`)
console.log(prices)
// {
//   viewer: {
//     homes: [
//       {
//         currentSubscription: {
//           priceInfo: {
//             current: {
//               total: 1.6478,
//               energy: 1.2308,
//               tax: 0.417,
//               startsAt: '2022-12-25T15:00:00.000+01:00'
//             },
//             today: [
//               {
//                 total: 1.7904,
//                 energy: 1.3448,
//                 tax: 0.4456,
//                 startsAt: '2022-12-25T00:00:00.000+01:00'
//               },
//               {
//                 total: 1.6762,
//                 energy: 1.2535,
//                 tax: 0.4227,
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
