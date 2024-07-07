import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Header } from './header'


vi.mock('next/navigation', () => {
  return {
    __esModule: true,
    useParams: () => ({
      locale: 'en'
    })
  }
})

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

describe('Views > Header', () => {
  test('display logo', () => {
    render(<Header />)

    expect(screen.getByAltText('common_logo.title')).toBeDefined()
  })
})
