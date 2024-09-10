'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { locales } from '../config/i18n'

import { I18nLocale } from 'src/types/i18n'


export type UseLocalesCurrentUrlParams = {
  currentLocale: I18nLocale
}

type UseLocalesCurrentUrlResult = {
  urls: Record<I18nLocale, string>
}

type UseLocalesCurrentUrlHook = (params: UseLocalesCurrentUrlParams) => UseLocalesCurrentUrlResult

const setLocaleIntoCurrentUrl = (
  currentLocale: I18nLocale,
  currentUrl: string,
  newLocale: I18nLocale
): string => {
  return currentUrl.replace(`/${currentLocale}`, `/${newLocale}`)
}

export const useLocalesCurrentUrl: UseLocalesCurrentUrlHook = (params) => {
  const { currentLocale } = params

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()

  const currentUrl = `${pathname}${queryString ? `?${queryString}` : ''}`

  const localesCurrentUrl: Record<I18nLocale, string> = {} as Record<I18nLocale, string>
  locales.forEach(locale => {
    localesCurrentUrl[locale] = setLocaleIntoCurrentUrl(currentLocale, currentUrl, locale)
  })

  return {
    urls: localesCurrentUrl
  }
}
