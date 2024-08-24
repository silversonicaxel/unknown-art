import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { Dialog } from './dialog'


describe('src > ds > Dialog', () => {
  beforeAll(() => {
    const dialogPortal = document.createElement('div')
    dialogPortal.id = 'dialog-root'
    document.body.appendChild(dialogPortal)
  })

  it('display no dialog, since it is not open', () => {
    render(<Dialog id="closed">Invisible content</Dialog>)

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('display no dialog, when open but not renderable', () => {
    render(<Dialog id="unrendered" open toRender={false}>Invisible content</Dialog>)

    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
