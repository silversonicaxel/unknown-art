import { memo } from 'react'


export const DialogProvider = memo(() => {
  return <div id="dialog-root" />
})

DialogProvider.displayName = 'DialogProvider'
