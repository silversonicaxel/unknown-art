import 'src/styles/globals.css'
import 'src/styles/reset.css'
import type { ReactNode } from 'react'


type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return children
}
