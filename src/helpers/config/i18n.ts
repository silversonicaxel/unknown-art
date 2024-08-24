export const defaultLocale = 'en'

export const locales = [defaultLocale, 'it']

export const locales_codes: Record<string, string> = {
  en: 'en_GB',
  it: 'it_IT'
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
