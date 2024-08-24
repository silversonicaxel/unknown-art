'use client'

import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'
import styles from './dialog.module.css'


export type DialogProps =
  & HTMLAttributes<HTMLDialogElement>
  & PropsWithChildren<{
    id: string
    toRender?: boolean
    open?: boolean
  }>

export const Dialog: FC<DialogProps> = ({
  toRender,
  open,
  children,
  ...props
}) => {
  if (!toRender) {
    return null
  }

  const dialogPortal = document.getElementById('dialog-root')
  if (!dialogPortal) {
    return null
  }

  return createPortal(
    (
      <FocusLock returnFocus autoFocus>
        <dialog
          className={styles.uadialog}
          open={open}
          {...props}
          aria-modal="true"
        >
          {children}
        </dialog>
      </FocusLock>
    ),
    dialogPortal
  )
}

Dialog.displayName = 'Dialog'
