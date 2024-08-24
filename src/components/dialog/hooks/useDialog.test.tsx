import { renderHook, act } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { viMockExenv, viMockStateReset } from '../../../../vitest.setup.mjs'
import { useDialog } from './useDialog'


describe('Components > Dialog > Hooks > useDialog', () => {
  test('return initial state of a not open modal', () => {
    const data = { id: 'not-open' }

    const { result } = renderHook(() => useDialog(data))

    expect(result.current.dialogProps).toMatchObject({
      id: data.id,
      open: false,
      'aria-describedby': 'not-open-description',
      'aria-labelledby': 'not-open-title'
    })
    expect(result.current.toRender).toBeFalsy()
    expect(result.current.openDialog).toBeInstanceOf(Function)
    expect(result.current.closeDialog).toBeInstanceOf(Function)
  })

  test('prevent to render the modal', () => {
    viMockExenv(true)

    const data = { id: 'openable' }

    const { result } = renderHook(() => useDialog(data))

    expect(result.current.toRender).toBeFalsy()

    viMockStateReset()
  })

  test('allow to render the modal', () => {
    viMockExenv(true)

    const data = { id: 'openable', open: true }

    const { result } = renderHook(() => useDialog(data))

    expect(result.current.toRender).toBeTruthy()

    viMockStateReset()
  })

  test('execute on close callback', () => {
    viMockExenv(true)

    const onCloseCallback = vi.fn()
    const data = { id: 'openable', open: true, onClose: onCloseCallback }

    const { result } = renderHook(() => useDialog(data))

    act(() => {
      const clickEvent = new MouseEvent('mousedown', { bubbles: true })
      result.current.dialogProps.onClose(clickEvent)
    })

    expect(onCloseCallback).toHaveBeenCalled()
    expect(onCloseCallback).toHaveBeenCalledTimes(1)

    viMockStateReset()
  })
})
