import { render, screen } from '@testing-library/react'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'

import {
  viMockNextNavigation,
  viMockReactI18next,
  viMockStateReset
} from '../../../vitest.setup.mjs'

import { Menu } from './menu'


describe('Components > Menu', () => {
  beforeAll(() => {
    viMockNextNavigation()
    viMockReactI18next()
  })

  afterAll(() => {
    viMockStateReset()
  })

  test('display full navigation element', () => {
    render(<Menu />)

    expect(screen.getByRole('navigation')).toHaveProperty('ariaLabel', 'unknown art menu')
  })

  test('display navigation menu', () => {
    render(<Menu />)

    expect(screen.getByLabelText('page menu.home')).toBeDefined()
    expect(screen.getByLabelText('page menu.bookshops')).toBeDefined()

    expect(screen.getByText('menu.home')).toBeDefined()
    expect(screen.getByText('menu.bookshops')).toBeDefined()
  })

  test('display language menu', () => {
    render(<Menu />)

    expect(screen.getByText('en')).toBeDefined()
    expect(screen.getByText('it')).toBeDefined()
  })
})
