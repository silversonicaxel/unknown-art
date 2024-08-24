import { changeLanguage } from 'i18next'
import { describe, expect, test } from 'vitest'
import { getTranslationServer } from './getTranslationServer'


describe('Helpers > Utils > getTranslationServer', () => {
  const languageData = { locale: 'en', namespace: 'common' }

  test('return expected resolved language', async () => {
    const { i18n: serverI18n } = await getTranslationServer(languageData)

    expect(serverI18n.resolvedLanguage).toBe('en')
  })

  test('return expected change language function', async () => {
    const { i18n: serverI18n } = await getTranslationServer(languageData)

    expect(serverI18n.changeLanguage.prototype).toEqual(changeLanguage.prototype)
    expect(serverI18n.changeLanguage).toBeInstanceOf(Function)
  })

  test('return expected t function', async () => {
    const { t: serverT } = await getTranslationServer(languageData)

    expect(serverT).toBeInstanceOf(Function)
  })
})
