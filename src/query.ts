import { getToken } from './token'

type TibberResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  error?: string
  errors?: { message: string }[]
}

const query = (queryString: string, variables?: object) =>
  fetch('https://api.tibber.com/v1-beta/gql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: queryString.replace(/\s+/g, ' '), variables })
  })
    .then((response) => response.json())
    .then(
      ({ data, error, errors }: TibberResponse) =>
        new Promise((resolve, reject) => {
          /* istanbul ignore next */
          if (errors) {
            reject(errors[0].message)
          } else if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
    )

export default query
