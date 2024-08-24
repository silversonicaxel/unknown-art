import type { Metadata } from 'next/types'
import { NotFoundContentClient } from 'src/components/not-found-content'


export const metadata: Metadata = {
  title: 'unknown art',
}

export default function HomeNotFound() {
  return (<NotFoundContentClient />)
}
