import { describe, expect, test } from 'vitest'

import { isEnvironmentDevelopment, isEnvironmentProduction } from './isEnvironment'


describe('Helpers > Utils > isEnvironmentDevelopment', () => {
  test('confirm development env', () => {
    expect(isEnvironmentDevelopment('development')).toBeTruthy()
  })

  test('deny development env', () => {
    expect(isEnvironmentDevelopment('production')).toBeFalsy()
  })
})

describe('Helpers > Utils > isEnvironmentProduction', () => {
  test('confirm development env', () => {
    expect(isEnvironmentProduction('production')).toBeTruthy()
  })

  test('deny development env', () => {
    expect(isEnvironmentProduction('development')).toBeFalsy()
  })
})
