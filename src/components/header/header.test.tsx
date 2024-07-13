import { render, screen } from '@testing-library/react'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'

import {
  viMockNextNavigation,
  viMockReactI18next,
  viMockStateReset
} from '../../../vitest.setup.mjs'


import { Header } from './header'


describe('Components > Header', () => {
  beforeAll(() => {
    viMockNextNavigation()
    viMockReactI18next()
  })

  afterAll(() => {
    viMockStateReset()
  })

  test('display navigation element as logo', () => {
    render(<Header />)

    expect(screen.getByLabelText('logo.label')).toHaveProperty('role', 'navigation')
  })

  test('display logo', () => {
    render(<Header />)

    expect(screen.getByAltText('logo.title')).toBeDefined()
  })
})
