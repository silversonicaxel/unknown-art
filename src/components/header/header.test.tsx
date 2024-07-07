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

describe('Views > Header', () => {
  test('display logo', () => {
    render(<Header />)

    expect(screen.getByAltText('logo unknown art')).toBeDefined()
  })
})
