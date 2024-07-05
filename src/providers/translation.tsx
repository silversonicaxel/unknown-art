'use client'

import { createInstance } from 'i18next'
import type { PropsWithChildren } from 'react'
import { memo } from 'react'
import { I18nextProvider } from 'react-i18next'

import initTranslations from '../../app/i18n'


export const translationNamespaces = ['translation']

export interface TranslationProviderProps {
  locale: string
  namespaces: string[]
  /* eslint-disable @typescript-eslint/no-explicit-any */
  resources: any
  /* eslint-enable */
}

export const TranslationProvider = memo<PropsWithChildren<TranslationProviderProps>>(
  ({ children, locale, namespaces, resources }) => {
    const i18n = createInstance()

    initTranslations(locale, namespaces, i18n, resources)

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  },
)

TranslationProvider.displayName = 'TranslationProvider'
