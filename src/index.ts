import process from 'process'

const url = process.env.TIBBER_API_URL || 'https://api.tibber.com/v1-beta/gql'

const query = (queryString: string, token = process.env.TIBBER_API_TOKEN) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: queryString })
  }).then(async (response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await response.json()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data
  })

export default query
