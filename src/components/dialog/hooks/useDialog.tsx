'use client'

import { canUseDOM } from 'exenv'
import { useCallback, useEffect, useMemo, useState, } from 'react'

import type { DialogProps } from '../dialog'


export type UseDialogParams = {
  id: string;
  open?: boolean;
  onClose?: () => void;
}

export type UseDialogHookResult = {
  toRender: boolean
  dialogProps: DialogProps
  openDialog: () => void
  closeDialog: () => void
}

export type UseDialogHook = (options: UseDialogParams) => UseDialogHookResult

export const useDialog: UseDialogHook = (props) => {
  const [toRender, setTodRender] = useState(false)
  const [isOpen, setIsOpen] = useState(props?.open ?? false)

  const openDialog = useCallback(() => {
    document.body.classList.add('with-dialog')
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsOpen(false)
    document.body.classList.remove('with-dialog')
  }, [])

  const dialogProps = useMemo(() => {
    return {
      ...props,
      open: isOpen,
      'aria-labelledby': `${props.id}-title`,
      'aria-describedby': `${props.id}-description`,
      onClose(): void {
        props.onClose?.()
      },
    }
  }, [props, isOpen])

  useEffect(() => {
    if (!canUseDOM) {
      setTodRender(isOpen)
      return
    }

    if (isOpen) {
      setTodRender(true)
    }
  }, [isOpen])

  return {
    toRender,
    dialogProps,
    openDialog,
    closeDialog,
  }
}
