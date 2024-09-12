export type ComponentParams = {
  params: {
    locale: string
  }
}

export type ComponentErrorParams = {
  error: Error & { digest?: string }
  reset: () => void
}
