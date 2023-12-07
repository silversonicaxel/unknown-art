import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Header } from './header'

vi.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

describe('Views > Header', () => {
  test('display title', async () => {
    render(<Header />)

    expect(screen.getByText('unknow art')).toBeDefined()
  })
})
