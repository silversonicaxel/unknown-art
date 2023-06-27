import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../views/header'
import { Menu } from '../views/menu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />

      <Menu />

      <Component {...pageProps} />
    </>
  )
}
