import { describe, expect, test, vi } from 'vitest'
import { getFindParamsFilter } from './index'

// deepseek r1 - plan reason
// antrhopic - claude

vi.mock('helpers/config/mongodb', () => ({
  clientPromise: Promise.resolve({
    db: vi.fn(),
    connect: vi.fn()
  })
}))

describe('getFindParamsFilter', () => {
  test('should return empty object for empty search', () => {
    const result = getFindParamsFilter('{}')
    expect(result).toEqual({})
  })

  test('should create name filter with regex', () => {
    const result = getFindParamsFilter('{"name":"Book Store"}')
    expect(result).toEqual({
      name: { $regex: 'Book Store', $options: 'si' }
    })
  })

  test('should create ISO filter', () => {
    const result = getFindParamsFilter('{"iso":"US"}')
    expect(result).toEqual({
      iso: 'US'
    })
  })

  test('should create city filter with regex', () => {
    const result = getFindParamsFilter('{"city":"New York"}')
    expect(result).toEqual({
      city: { $regex: 'New York', $options: 'si' }
    })
  })

  test('should filter bookshops with website', () => {
    const result = getFindParamsFilter('{"website":"with"}')
    expect(result).toEqual({
      site: { $exists: true }
    })
  })

  test('should filter bookshops without website', () => {
    const result = getFindParamsFilter('{"website":"without"}')
    expect(result).toEqual({
      site: { $exists: false }
    })
  })

  test('should combine multiple search criteria', () => {
    const result = getFindParamsFilter('{"name":"Book","city":"London","website":"with"}')
    expect(result).toEqual({
      name: { $regex: 'Book', $options: 'si' },
      city: { $regex: 'London', $options: 'si' },
      site: { $exists: true }
    })
  })
})
