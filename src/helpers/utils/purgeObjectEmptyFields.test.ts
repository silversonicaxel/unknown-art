import { describe, expect, test } from 'vitest'

import { purgeObjectEmptyValues } from './purgeObjectEmptyValues'


describe('Helpers > Utils > purgeObjectEmptyValues', () => {
  test('return empty object', () => {
    expect(purgeObjectEmptyValues({})).toEqual({})
  })

  test('return object with keys associated to filled string', () => {
    expect(purgeObjectEmptyValues({ name: 'book', iso: null, city: '', website: undefined }))
      .toEqual({ name: 'book' })
  })
})
