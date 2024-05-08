import Head from 'next/head'
import type { FC } from 'react'


type MetaProps = {
  title?: string
}

export const Meta: FC<MetaProps> = (props) => {
  const { title } = props

  const headTitle = `unknow art${title ? ` - ${title}` : ''}`

  return (
    <Head>
      <title>{headTitle}</title>
    </Head>
  )
}

Meta.displayName = 'Meta'
