import Head from 'next/head'

type HeaderProps = {
  title?: string
}

const Header = (props: HeaderProps) => {
  const { title } = props

  const headTitle = `unknow art${title ? ` - ${title}` : ''}`

  return (
    <Head>
      <title>{headTitle}</title>
      <meta name='description' content='unknow art' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link
        href='https://fonts.googleapis.com/css?family=Space Mono&display=optional'
        rel='stylesheet'
      />
    </Head>
  )
}

export default Header
