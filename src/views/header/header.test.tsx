import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Header } from './header'

describe('Views > Header', () => {
  test('display logo', () => {
    render(<Header />)

    expect(screen.getByAltText('logo unknown art')).toBeDefined()
  })
})
