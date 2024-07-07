import type { i18n, TFunction } from 'i18next'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { getOptions } from 'src/helpers/config/i18n'


type UseTranslationServerParams = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  locale: string,
  namespace: string,
  options?: { keyPrefix?: any }
  /* eslint-enable */
}

type UseTranslationServerResult = {
  t: TFunction
  i18n: i18n
}

type UseTranslationServerHook =
  (params: UseTranslationServerParams) => Promise<UseTranslationServerResult>

const initI18next = async (locale: string, namespace: string) => {
  const i18nInstance = createInstance()
  const storeData = getOptions(locale, namespace)

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (resourceLocale: string, resourceNamespace: string) =>
          import(`../../locales/${resourceLocale}/${resourceNamespace}.json`)
      )
    )
    .init(storeData)
  return i18nInstance
}

export const useTranslationServer: UseTranslationServerHook = async (params) => {
  const { locale, namespace, options = {}} = params
  const i18nextInstance = await initI18next(locale, namespace)

  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(namespace) ? namespace[0] : namespace,
      options.keyPrefix
    ),
    i18n: i18nextInstance
  }
}
