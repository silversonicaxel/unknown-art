import { describe, expect, test } from 'vitest'
import { isImageSecure } from './isImageSecure'


describe('Helpers > Utils > isImageSecure', () => {
  test('check image secure', () => {
    expect(isImageSecure('https://link-to-image-secure.jpg')).toBeTruthy()
  })

  test('check image insecure', () => {
    expect(isImageSecure('http://link-to-image-insecure.jpg')).toBeFalsy()
  })
})
