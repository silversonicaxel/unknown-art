import { renderHook } from '@testing-library/react'
import { changeLanguage, t } from 'i18next'
import { expect, test, describe } from 'vitest'

import { useTranslationClient } from './useTranslationClient'


describe('Helpers > Hooks > useTranslationClient', () => {
  const languageData = { locale: 'en', namespace: 'common' }

  test('should return expected resolved language', () => {
    const { result } = renderHook(() => useTranslationClient(languageData))

    expect(result.current.i18n.resolvedLanguage).toBe('en')
  })

  test('should return expected change language function', () => {
    const { result } = renderHook(() => useTranslationClient(languageData))

    expect(result.current.i18n.changeLanguage.prototype).toEqual(changeLanguage.prototype)
    expect(result.current.i18n.changeLanguage).toBeInstanceOf(Function)
  })

  test('should return expected t function', () => {
    const { result } = renderHook(() => useTranslationClient(languageData))

    expect(result.current.t.prototype).toEqual(t.prototype)
    expect(result.current.t).toBeInstanceOf(Function)
    expect(result.current.t('menu.places')).toBe(t('menu.places'))
  })
})
