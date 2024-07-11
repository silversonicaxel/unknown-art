import { describe, expect, test } from 'vitest'

import { isImageInsecure } from './isImageInsecure'


describe('Helpers > Utils > isImageInsecure', () => {
  test('check image secure', () => {
    expect(isImageInsecure('https://link-to-image-secure.jpg')).toBeFalsy()
  })

  test('check image insecure', () => {
    expect(isImageInsecure('http://link-to-image-insecure.jpg')).toBeTruthy()
  })
})
