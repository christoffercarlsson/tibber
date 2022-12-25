const TIBBER_API_URL = 'https://api.tibber.com/v1-beta/gql'

export const createQuery =
  (token: string, url = TIBBER_API_URL) =>
  (queryString: string) =>
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: queryString })
    }).then((response) => response.json())

export const query = (token: string, queryString: string, url?: string) => {
  const performQuery = createQuery(token, url)
  return performQuery(queryString)
}
