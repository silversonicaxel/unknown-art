import { cleanup } from '@testing-library/react'
import { vi, afterEach } from 'vitest'


export const viMockNextNavigation = () => {
  vi.mock('next/navigation', () => {
    return {
      __esModule: true,
      useParams: () => ({ locale: 'en' }),
      useSearchParams: () => ({ query: '{"website":"without"}' }),
      usePathname: () => '/en/bookshops'
    }
  })
}

export const viMockReactI18next = () => {
  vi.mock('react-i18next', () => {
    return {
      __esModule: true,
      useTranslation: () => ({
        t: (translation: string) => translation,
        i18n: {
          resolvedLanguage: 'en',
          changeLanguage: () => new Promise(() => {}),
        }
      }),
      initReactI18next: {
        type: '3rdParty',
        init: () => {},
      },
    }
  })
}

export const viMockExenv = (canUseDom: boolean) => {
  vi.mock('exenv', () => {
    return {
      __esModule: true,
      canUseDOM: () => canUseDom
    }
  })
}

export const viMockStateReset = () => {
  vi.clearAllMocks()
  vi.resetAllMocks()
  vi.restoreAllMocks()
}

afterEach(() => {
  cleanup()
})
