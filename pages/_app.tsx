import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Space_Mono } from 'next/font/google'
import { Header } from '../views/header'
import { Menu } from '../views/menu'

const spaceMonoFont = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={spaceMonoFont.className}>
      <Header />

      <Menu />

      <Component {...pageProps} />
    </div>
  )
}
