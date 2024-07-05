import type { ReactNode } from 'react'

import type { TranslationProviderProps } from '../../src/providers/translation'
import { TranslationProvider, translationNamespaces } from '../../src/providers/translation'
import initTranslations from '../i18n'


type AppLayoutProps = {
  children: ReactNode,
  params: {
    locale: TranslationProviderProps['locale']
  }
}

export default async function AppLayout({ children, params: { locale } }: AppLayoutProps) {
  const { resources } = await initTranslations(locale, translationNamespaces)

  return (
    <TranslationProvider locale={locale} resources={resources} namespaces={translationNamespaces}>
      {children}
    </TranslationProvider>
  )
}
