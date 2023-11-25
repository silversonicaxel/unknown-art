import { memo } from 'react'
import type { FC } from 'react'

type LoadingProps = {
  text: string
}

export const Loading: FC<LoadingProps> = memo(({ text }) => {
  return <>{`Loading ${text} ...`}</>
})

Loading.displayName = 'Loading'
