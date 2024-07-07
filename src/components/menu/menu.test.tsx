import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Menu } from './menu'


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

describe('Views > Menu', () => {
  test('display navigation menu', () => {
    render(<Menu />)

    expect(screen.getByLabelText('home page')).toBeDefined()
    expect(screen.getByLabelText('places page')).toBeDefined()
  })
})
