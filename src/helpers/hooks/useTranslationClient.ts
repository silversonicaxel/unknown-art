'use client'

import { getOptions, locales, I18N_COOKIE_NAME } from 'helpers/config/i18n'
import type { i18n, TFunction } from 'i18next'
import { use } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { initReactI18next, useTranslation } from 'react-i18next'
import type { I18nLocale } from 'types/i18n'


export type UseTranslationClientParams = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  locale: I18nLocale
  namespace: string
  options?: { keyPrefix?: any }
  /* eslint-enable */
}

type UseTranslationClientResult = {
  t: TFunction
  i18n: i18n
}

type UseTranslationClientHook =
  (params: UseTranslationClientParams) => UseTranslationClientResult

const runsOnServerSide = typeof window === 'undefined'

const initI18next = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (resourceLocale: string, resourceNamespace: string) =>
          import(`../../../locales/${resourceLocale}/${resourceNamespace}.json`)
      )
    )
    .init({
      ...getOptions(),
      lng: undefined,
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
      },
      preload: runsOnServerSide ? locales : []
    })
  /* eslint-enable */
}

initI18next()

export const useTranslationClient: UseTranslationClientHook = (params) => {
  const { locale, namespace, options = {}} = params

  const [cookies, setCookie] = useCookies([I18N_COOKIE_NAME])

  const translationResponse = useTranslation(namespace, options)
  const { i18n } = translationResponse

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return
    setActiveLng(i18n.resolvedLanguage)
  }, [activeLng, i18n.resolvedLanguage])

  useEffect(() => {
    if (!locale || i18n.resolvedLanguage === locale) return
    i18n.changeLanguage(locale)
  }, [locale, i18n])

  useEffect(() => {
    if (cookies.NEXT_I18N_CURRENT_LOCALE === locale) return
    setCookie(I18N_COOKIE_NAME, locale, { path: '/' })
  }, [locale, cookies.NEXT_I18N_CURRENT_LOCALE, setCookie])

  if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale)
  }

  return translationResponse
}
