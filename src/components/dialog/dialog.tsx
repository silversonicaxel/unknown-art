'use client'

import { canUseDOM } from 'exenv'
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import styles from './dialog.module.css'


export type DialogProps =
  & HTMLAttributes<HTMLDialogElement>
  & PropsWithChildren<{
    id: string
    toRender?: boolean
    open?: boolean
  }>

export const Dialog: FC<DialogProps> = ({
  id,
  toRender,
  open,
  children,
  ...props
}) => {
  if (!toRender || !canUseDOM) {
    return null
  }

  const dialogPortal = document.getElementById('dialog-root')
  if (!dialogPortal) {
    return null
  }

  return createPortal(
    (
      <dialog
        className={styles.uadialog}
        open={open}
        {...props}
      >
        {children}
      </dialog>
    ),
    dialogPortal
  )
}

Dialog.displayName = 'Dialog'
