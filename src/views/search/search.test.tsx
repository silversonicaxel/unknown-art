import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Search } from './search'

describe('Views > Search', () => {
  test('display input', () => {
    render(<Search />)

    expect(screen.getByRole('input')).toBeDefined()
  })
})
