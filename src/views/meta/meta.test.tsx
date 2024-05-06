import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Meta } from './meta'

vi.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

describe('Views > Meta', () => {
  test('display title', async () => {
    render(<Meta />)

    expect(screen.getByText('unknow art')).toBeDefined()
  })
})
