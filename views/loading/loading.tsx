import { memo } from 'react'
import type { FC } from 'react'

type LoadingProps = {
  text: string
}

const Loading: FC<LoadingProps> = ({ text }) => {
  return <>{`Loading...${text}`}</>
}

export default memo(Loading)
