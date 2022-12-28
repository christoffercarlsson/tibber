import process from 'process'

type TibberResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  error?: string
  errors?: { message: string }[]
}

const url = process.env.TIBBER_API_URL || 'https://api.tibber.com/v1-beta/gql'

const query = (queryString: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TIBBER_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: queryString.replace(/\s+/g, ' ') })
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
