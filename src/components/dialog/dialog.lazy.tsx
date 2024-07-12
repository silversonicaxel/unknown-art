import type { FC } from 'react'
import { lazy } from 'react'

import type { DialogProps } from './dialog'


const DialogLazyComponent = lazy(
  async () => {
    const { Dialog } = await import('./dialog',)

    return { default: Dialog }
  },
)

export type DialogLazyProps = DialogProps

export const DialogLazy: FC<DialogLazyProps> = (props) => {
  return (<DialogLazyComponent {...props} />)
}
