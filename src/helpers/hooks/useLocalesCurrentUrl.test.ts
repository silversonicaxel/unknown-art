import { renderHook } from '@testing-library/react'
import { expect, test, describe } from 'vitest'
import { defaultLocale, locales } from '../config/i18n'
import type { UseLocalesCurrentUrlParams } from './useLocalesCurrentUrl'
import { useLocalesCurrentUrl  } from './useLocalesCurrentUrl'


describe('Helpers > Hooks > useLocalesCurrentUrl', () => {
  const data: UseLocalesCurrentUrlParams = { currentLocale: defaultLocale }

  test('return total urls as total locales', () => {
    const { result } = renderHook(() => useLocalesCurrentUrl(data))

    expect(Object.entries(result.current.urls)).toHaveLength(locales.length)
  })
})
