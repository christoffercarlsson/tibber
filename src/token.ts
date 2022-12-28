let currentToken: string = null

export const getToken = () => currentToken

export const setToken = (token: string) => {
  currentToken = token
}
