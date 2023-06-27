import Head from 'next/head'
import type { FC } from 'react'

type HeaderProps = {
  title?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const { title } = props

  const headTitle = `unknow art${title ? ` - ${title}` : ''}`

  return (
    <Head>
      <title>{headTitle}</title>
    </Head>
  )
}

Header.displayName = 'Header'
