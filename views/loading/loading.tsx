import { memo } from 'react'

type LoadingProps = {
  text: string
}

const Loading = ({ text }: LoadingProps) => {
  return <>{`Loading...${text}`}</>
}

export default memo(Loading)
