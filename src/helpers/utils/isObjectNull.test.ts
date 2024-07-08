import { describe, expect, test } from 'vitest'

import { isObjectNull } from './isObjectNull'


describe('Helpers > Utils > isObjectNull', () => {
  test('check empty object', () => {
    expect(isObjectNull({})).toBeTruthy()
  })

  test('check object with key associated to empty string', () => {
    expect(isObjectNull({ name: '' })).toBeTruthy()
  })

  test('check object with key associated to null', () => {
    expect(isObjectNull({ surname: undefined })).toBeTruthy()
  })

  test('check object with key associated to undefined', () => {
    expect(isObjectNull({ address: null })).toBeTruthy()
  })

  test('check object with key associated to empty data', () => {
    expect(isObjectNull({ name: '', surname: undefined, address: null })).toBeTruthy()
  })

  test('check object with key associated to some valued strings', () => {
    expect(isObjectNull({ name: '', surname: 'Surname' })).toBeFalsy()
  })

  test('check object with key associated to only valued strings', () => {
    expect(isObjectNull({ name: 'Name', surname: 'Surname' })).toBeFalsy()
  })
})
