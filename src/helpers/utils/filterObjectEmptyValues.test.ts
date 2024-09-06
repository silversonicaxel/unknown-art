import { describe, expect, test } from 'vitest'

import { filterObjectEmptyValues } from './filterObjectEmptyValues'


describe('Helpers > Utils > filterObjectEmptyValues', () => {
  test('return empty object', () => {
    expect(filterObjectEmptyValues({})).toEqual({})
  })

  test('return object with keys associated to filled string', () => {
    expect(filterObjectEmptyValues({ name: 'book', iso: null, city: '', website: undefined }))
      .toEqual({ name: 'book' })
  })
})
