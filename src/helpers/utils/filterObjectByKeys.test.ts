import { describe, expect, test } from 'vitest'

import { filterObjectByKeys } from './filterObjectByKeys'


describe('Helpers > Utils > filterObjectByKeys', () => {
  test('return empty object when empty object provided', () => {
    expect(filterObjectByKeys({}, ['A', 'B'])).toEqual({})
  })

  test('return empty object when no keys provided', () => {
    expect(filterObjectByKeys({ A: 'A', B: 'B' }, [])).toEqual({})
  })

  test('return object with filtered keys', () => {
    expect(filterObjectByKeys({ A: 'A', B: 'B', C: 'C' }, ['A', 'B']))
      .toEqual({ A: 'A', B: 'B' })
  })

  test('return object with filtered keys and only set values', () => {
    expect(
      filterObjectByKeys({ A: 'A', B: 'B', C: undefined, D: null }, ['A', 'B', 'C', 'D'], true)
    )
      .toStrictEqual({ A: 'A', B: 'B' })
  })

  test('return object with filtered keys and not only set values', () => {
    expect(filterObjectByKeys({ A: 'A', B: null, C: undefined }, ['A', 'B', 'C'], false))
      .toStrictEqual({ A: 'A', B: null, C: undefined })
  })
})
