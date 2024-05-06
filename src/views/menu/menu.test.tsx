import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Menu } from './menu'

describe('Views > Menu', () => {
  test('display navigation menu', () => {
    render(<Menu />)

    expect(screen.getAllByLabelText('home')).toBeDefined()
    expect(screen.getAllByLabelText('places')).toBeDefined()
  })
})
