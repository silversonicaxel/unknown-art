import type { I18nLocale } from 'types/i18n'


export const defaultLocale = 'en'

export const locales = [defaultLocale, 'it', 'zh'] as const

export const locales_regional_codes: Record<I18nLocale, string> = {
  en: 'en_GB',
  it: 'it_IT',
  zh: 'zh_CN'
}

export const I18N_COOKIE_NAME = 'NEXT_I18N_CURRENT_LOCALE'

export const defaultNamespace = 'translation'

export function getOptions (locale = defaultLocale, ns = defaultNamespace) {
  return {
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng: locale,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns
  }
}
