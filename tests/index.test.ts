import { createQuery } from '../src/index'

describe('createQuery', () => {
  it('should create a function that performs queries towards the Tibber API', () => {
    const query = createQuery('abc123')
    expect(typeof query).toBe('function')
  })
})
